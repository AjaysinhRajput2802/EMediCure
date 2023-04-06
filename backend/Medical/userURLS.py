from django.urls import path
from .userView import RegistrationAPI, LoginAPI, UserAPI
from knox import views as knox_views

urlpatterns = [
    path('register/', RegistrationAPI.as_view(), name="register"),
    path('login/', LoginAPI.as_view(), name='login'),
    path('user/', UserAPI.as_view(), name='user.info'),
    path('logout/', knox_views.LogoutView.as_view(), name='logout')
]
