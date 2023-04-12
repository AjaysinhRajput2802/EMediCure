from .views import *
from django.urls import path,include

urlpatterns = [
    path('login/',LoginAPI.as_view(),name='auth-login'),
    path('register/',RegistrationAPI.as_view(),name='auth-register'),
    path('refresh/',RefreshAPI.as_view(),name='auth-refresh'),
    path('logout/',LogoutAPI.as_view(),name='auth-logout'),
    path('user',UserAPI.as_view(),name='auth-user'),

    path('password_reset/', 
         ResetPasswordRequestAPI.as_view(),
         name="password_reset"),

    path('password_reset/confirm/<uidb64>/<token>/',
         PasswordTokenCheckAPI.as_view(),
         name='password-reset-confirm'),

    path('password_reset/complete/',
         SetNewPasswordAPI.as_view(),
         name='password-reset-complete'),
    
    path('password_change/',
         ChangePasswordAPI.as_view(),
         name='password-change'),
]