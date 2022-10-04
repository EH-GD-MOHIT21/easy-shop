from django.urls import path
from .views import LoginViewApi,LoginOTPValidateApi

urlpatterns = [
    path('login',LoginViewApi.as_view()),
    path('validate/login',LoginOTPValidateApi.as_view()),
]
