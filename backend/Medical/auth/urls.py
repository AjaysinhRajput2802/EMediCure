from .views import *
from django.urls import path
from rest_framework_simplejwt.views import TokenBlacklistView
urlpatterns = [
    path('login/',LoginAPI.as_view(),name='auth-login'),
    path('register/',RegistrationAPI.as_view(),name='auth-register'),
    path('refresh/',RefreshAPI.as_view(),name='auth-refresh'),
    path('logout/',TokenBlacklistView.as_view(),name='auth-logout'),
    path('logoutall/',LogoutAllAPI.as_view(),name='auth-logout-all'),
]
