from django.urls import path
from .views import LoginViewApi,LoginOTPValidateApi,RecoverAccountApi,ValidateRecoverTokenApi,RegisterViewApi,ValidateUserRegisterApi,UserAccDetailsApi,CheckForUsernameApi,CheckForEmailApi,IsAuthenticatedApi,UserBasicDetailsApi,SignOutApi

urlpatterns = [
    path('login',LoginViewApi.as_view()),
    path('validate/login',LoginOTPValidateApi.as_view()),
    path('recover',RecoverAccountApi.as_view()),
    path('reset',ValidateRecoverTokenApi.as_view()),
    path('register',RegisterViewApi.as_view()),
    path('register/verify/token=<slug:token>/email=<str:email>',ValidateUserRegisterApi.as_view()),
    path('mydetails',UserAccDetailsApi.as_view()),
    path('checkforusername',CheckForUsernameApi.as_view()),
    path('checkforemail',CheckForEmailApi.as_view()),
    path('isauthenticated',IsAuthenticatedApi.as_view()),
    path('userbasicdetails',UserBasicDetailsApi.as_view()),
    path('logout',SignOutApi.as_view())
]
