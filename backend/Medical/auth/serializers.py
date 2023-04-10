from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import User
from Medical.models import Profile
from rest_framework_simplejwt.tokens import RefreshToken,TokenError


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name','last_name']

class ProfileSerializers(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['mobileNo','role']
        
class LoginSerializer(TokenObtainPairSerializer):

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
        if attrs['confirm_password'] != attrs['password']:
            raise serializers.ValidationError("passwords are not matching...")
        del attrs['confirm_password']
        return attrs
    
    def create(self, validated_data):
        profile = validated_data.pop('profile')
        
        try:
            user = User.objects.get(username=validated_data['username'])
        except ObjectDoesNotExist:
            user = User.objects.create_user(**validated_data)
            profile_instance = Profile.objects.create(user = user,**profile)
        return user
    

