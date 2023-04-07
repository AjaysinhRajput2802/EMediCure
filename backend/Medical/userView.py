from rest_framework import permissions, generics, status
from rest_framework.response import Response
from .userSerializers import CreateUserSerializer, UserSerializer, LoginUserSerializer
from django.contrib.auth import login, logout
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from django.contrib.auth.models import User

class RegistrationAPI(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            userData = UserSerializer(user, context=self.get_serializer_context()).data,
            return Response({'user':userData.data}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)



class LoginAPI(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = LoginUserSerializer
    authentication_classes = (SessionAuthentication,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.validate(request.data)
            login(request, user)
            return Response({'user':UserSerializer(user).data}, status=status.HTTP_200_OK)
        # return Response(status=status.HTTP_400_BAD_REQUEST)

class LogoutAPI(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request):
        try:
            userName = request.user.username
            logout(request)
            return Response({userName + " logout from system"},status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e,status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserAPI(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = UserSerializer
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user':serializer.data}, status=status.HTTP_200_OK)