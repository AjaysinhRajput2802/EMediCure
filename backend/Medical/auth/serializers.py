from Medical.models import Profile

from django.core.exceptions import ObjectDoesNotExist

from django.contrib.auth.models import User,update_last_login
from django.contrib.auth.tokens import PasswordResetTokenGenerator

from rest_framework.exceptions import AuthenticationFailed
from rest_framework import serializers
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode

from backend.settings import EMAIL_HOST_USER

class ProfileSerializers(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['mobileNo','role']

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializers()
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name','last_name','profile']

class LoginSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['user'] = UserSerializer(user).data
        # ...

        return token
    
    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['username'] = str(self.user.username)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data

class RegisterSerializer(UserSerializer):
    password = serializers.CharField(max_length=128, min_length=8, write_only=True, required=True)
    email = serializers.EmailField(required=True, write_only=True, max_length=128)
    confirm_password = serializers.CharField(max_length=128, min_length=8, write_only=True, required=True)
    profile = ProfileSerializers()

    class Meta:
        model = User
        fields = ['id', 'username','email','first_name','last_name','password','confirm_password','profile']
        write_only_fields = ['password','confirm_password','profile']
    

    def validate(self, attrs):
        errors = []
        if User.objects.filter(email = attrs['email']):
            errors.append({'email_error' : "A user with same email address already exists."})
        if attrs['confirm_password'] != attrs['password']:
            errors.append({'confirm_password error':"password and confirm password are not matching."})
        del attrs['confirm_password']
        if errors:
            raise serializers.ValidationError(errors)
        return attrs
    
    def create(self, validated_data):
        profile = validated_data.pop('profile')
        
        try:
            user = User.objects.get(username=validated_data['username'])
        except ObjectDoesNotExist:
            user_instance = User.objects.create_user(**validated_data)
            profile_instance = Profile.objects.create(user = user_instance,**profile)
            if profile_instance.role == "Owner":
                user_instance.is_superuser = True
                user_instance.is_staff = True
                user_instance.save()
            else:
                user_instance.is_staff = True
                user_instance.save()
        return user_instance
    

class ResetPasswordRequestSerializers(serializers.Serializer):
    email = serializers.EmailField(required=True)
    redirect_url = serializers.CharField(max_length=500, required=False)

    class Meta:
        fields = ['email']
      
class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(
        min_length=1, write_only=True)
    uidb64 = serializers.CharField(
        min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)

            user.set_password(password)
            user.save()
            return (user)
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)
        return super().validate(attrs)

class ChangePasswordSerializers(serializers.Serializer):
    oldPassword = serializers.CharField(max_length=128, min_length=8, write_only=True, required=True)
    newPassword = serializers.CharField(max_length=128, min_length=8, write_only=True, required=True)
    username = serializers.CharField()

    class Meta:
        fields = ['oldPassword','newPassword','username']
        
    
    def validate(self, attrs):
        print(attrs)
        op = attrs.get('oldPassword')
        np = attrs.get('newPassword')
        un = attrs.get('username')
        
        if(op == np):
            raise serializers.ValidationError({'newPassword':'Please enter diffrent password than old password'})
        
        userObj = User.objects.get(username=un)
        userObj.set_password(np)
        userObj.save()
        return super().validate(attrs)