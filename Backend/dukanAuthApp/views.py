from rest_framework.views import APIView
from rest_framework.response import Response
from dukanAuthApp.repository import DukanAuth, DukanAuthUtils


class RegisterViewApi(APIView):
    def post(self, request, *args, **kwargs):
        try:
            if not request.user.is_authenticated:
                return DukanAuth().RegisterUser(request)
            else:
                return Response({'status': 200, 'message': 'Already Logged in.'})
        except Exception as e:
            return Response({'status': 404, 'message': str(e)})


class ValidateUserRegisterApi(APIView):
    def get(self,request,*args,**kwargs):
        try:
            if not request.user.is_authenticated:
                return DukanAuth().ValidateRegisterUser(request,kwargs['email'],kwargs['token'])
            else:
                return Response({'status': 200, 'message': 'Already Logged in.'})
        except Exception as e:
            return Response({'status': 404, 'message': str(e)})


class CheckForUsernameApi(APIView):
    def post(self, request, *args, **kwargs):
        try:
            DukanAuthUtils().IsUsernameAvailable(request)
            return Response({'status': 200, 'message': 'username avaialble.'})
        except:
            return Response({'status': 404, 'message': 'username not available'})


class CheckForEmailApi(APIView):
    def post(self, request, *args, **kwargs):
        try:
            DukanAuthUtils().IsEmailAvailable(request)
            return Response({'status': 200, 'message': 'email avaialble.'})
        except:
            return Response({'status': 404, 'message': 'email not available'})


class LoginViewApi(APIView):
    def post(self, request, *args, **kwargs):
        try:
            if not request.user.is_authenticated:
                return DukanAuth().LoginUser(request)
            else:
                return Response({'status': 200, 'message': 'Already Logged in.'})
        except Exception as e:
            return Response({'status': 404, 'message': str(e)})


class LoginOTPValidateApi(APIView):
    def post(self, request, *args, **kwargs):
        try:
            if not request.user.is_authenticated:
                return DukanAuth().ValidateOTPLogin(request)
            else:
                return Response({'status': 200, 'message': 'Already Logged in.'})
        except Exception as e:
            return Response({'status': 404, 'message': str(e)})


class RecoverAccountApi(APIView):
    def post(self, request, *args, **kwargs):
        try:
            return DukanAuth().RecoverAccount(request)
        except Exception as e:
            return Response({'status': 404, 'message': str(e)})


class ValidateRecoverTokenApi(APIView):
    def post(self, request, *args, **kwargs):
        try:
            return DukanAuth().ValidateRecoverToken(request)
        except Exception as e:
            return Response({'status': 404, 'message': str(e)})
