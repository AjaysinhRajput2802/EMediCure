from django.urls import path
from .userView import RegistrationAPI, LoginAPI, UserAPI, LogoutAPI
# from knox import views as knox_views

urlpatterns = [
    path('register/', RegistrationAPI.as_view(), name="register"),
    path('login/', LoginAPI.as_view(), name='login'),
    path('user/', UserAPI.as_view(), name='user.info'),
    path('logout/', LogoutAPI.as_view(), name='logout')
]
