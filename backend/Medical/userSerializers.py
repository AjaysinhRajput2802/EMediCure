from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile
from django.contrib.auth import authenticate


class CreateUserSerializer(serializers.ModelSerializer):

    class CreateProfileSerilizer(serializers.ModelSerializer):
        class Meta:
            model = Profile
            exclude = ['user']
    
    modelprofile = CreateProfileSerilizer()

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name', 'modelprofile')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profiledata = validated_data.pop('modelprofile')
        userdata = User.objects.create_user(**validated_data)
            # validated_data['username'], validated_data['email'], validated_data['password']
        Profile.objects.create(user = userdata, **profiledata)
        return userdata


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid Details.")
