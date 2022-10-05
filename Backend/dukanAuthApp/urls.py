from django.urls import path
from .views import LoginViewApi,LoginOTPValidateApi,RecoverAccountApi,ValidateRecoverTokenApi

urlpatterns = [
    path('login',LoginViewApi.as_view()),
    path('validate/login',LoginOTPValidateApi.as_view()),
    path('recover',RecoverAccountApi.as_view()),
    path('reset',ValidateRecoverTokenApi.as_view()),
]
