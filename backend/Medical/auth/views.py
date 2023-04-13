from django.urls import reverse
from .serializers import *
from django.core.mail import send_mail,EmailMessage
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken,AccessToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework import generics,permissions
from rest_framework import status

from django.utils.encoding import smart_bytes,DjangoUnicodeDecodeError,smart_str
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode

from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.sites.shortcuts import get_current_site

from Medical.utils import Util

from django.template.loader import render_to_string

class RegistrationAPI(generics.CreateAPIView,TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        res = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }

        return Response({
            "user": UserSerializer(user).data,
            "refresh": res["refresh"],
            "token": res["access"]
        }, status=status.HTTP_201_CREATED)

class LoginAPI(generics.CreateAPIView,TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = LoginSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)   

class LogoutAPI(generics.CreateAPIView):
    
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh"]
            access_token = AccessToken(str(request.headers['Authorization'].split(' ')[1]))
            user= access_token['user']
            token = RefreshToken(refresh_token)
            token.blacklist()
            message = str(user['username']) + " logout from the system... :)"
            return Response(data = {message},status=status.HTTP_200_OK)
        except TokenError  as e:
                raise InvalidToken(e.args[0])

class RefreshAPI(generics.CreateAPIView,TokenRefreshView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)

class UserAPI(generics.RetrieveAPIView):
    permission_classes =(permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        access_token = str(request.headers['Authorization'].split(' ')[1])
        access_token_obj = AccessToken(access_token)
        user_data = access_token_obj['user']
        print(user_data)

        return Response(user_data,status=status.HTTP_200_OK)

class ResetPasswordRequestAPI(generics.GenericAPIView):

    serializer_class = ResetPasswordRequestSerializers
    permission_classes = [permissions.AllowAny,]

    def post(self,request):
        serializer = self.serializer_class(data=request.data)
        email = request.data.get('email', '')
        
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(
                request=request).domain
            relativeLink = reverse(
                'password-reset-confirm', kwargs={'uidb64': uidb64, 'token': token})
            redirect_url = request.data.get('redirect_url', '')
            absurl = 'http://'+current_site + relativeLink
            reset_url = absurl+"?redirect_url="+redirect_url
            
            context = {
                'username':user.username,
                'reset_url' : reset_url,
                'site_name':'EMdeicure',
            }
            email_body = render_to_string("rept.txt",context)
            to_email=user.email
            email_subject='Reset Password Request' 
            email = EmailMessage(
                email_subject,
                email_body,
                EMAIL_HOST_USER,
                [to_email]
            )
            try:
                email.send(fail_silently=False)
            except Exception as e:
                return Response({'error':'try again after some time...'},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return Response({'success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)
        return Response({'email': 'There is not any account  related with this email'}, status=status.HTTP_404_NOT_FOUND)

class PasswordTokenCheckAPI(generics.GenericAPIView):

    permission_classes = [permissions.AllowAny,]
    def get(self,request,uidb64,token):
        redirect_url = request.GET.get('redirect_url')

        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'error': 'Token is not valid, please request a new one'}, status=status.HTTP_401_UNAUTHORIZED)
            return Response({'success':True,'message':'Credential are valid','uidb64':uidb64,'token':token},status=status.HTTP_200_OK)
        except DjangoUnicodeDecodeError as identifier:
                return Response({'error': 'Token is not valid, please request a new one'}, status=status.HTTP_401_UNAUTHORIZED)

class SetNewPasswordAPI(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer
    permission_classes = [permissions.AllowAny,]
    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Password reset successfully'}, status=status.HTTP_200_OK)

class ChangePasswordAPI(generics.GenericAPIView):
    serializer_class = ChangePasswordSerializers
    permission_classes = [permissions.IsAuthenticated,]
   
    def patch(self,request):

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Password Changed successfully'}, status=status.HTTP_200_OK)
