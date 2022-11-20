from django.urls import path
from .views import LoginViewApi,LoginOTPValidateApi,RecoverAccountApi,ValidateRecoverTokenApi,RegisterViewApi,ValidateUserRegisterApi

urlpatterns = [
    path('login',LoginViewApi.as_view()),
    path('validate/login',LoginOTPValidateApi.as_view()),
    path('recover',RecoverAccountApi.as_view()),
    path('reset',ValidateRecoverTokenApi.as_view()),
    path('register',RegisterViewApi.as_view()),
    path('register/verify/token=<slug:token>/email=<str:email>',ValidateUserRegisterApi.as_view()),
]
