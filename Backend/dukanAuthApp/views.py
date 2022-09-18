from rest_framework.views import APIView
from rest_framework.response import Response
from dukanAuthApp.repository import DukanAuth


class RegisterViewApi(APIView):
    def post(self,request,*args,**kwargs):
        pass



class LoginViewApi(APIView):
    def post(self,request,*args,**kwargs):
        try:
            if not request.user.is_authenticated:
                return DukanAuth().LoginUser(request)
            else:
                return Response({'status':200,'message':'Already Logged in.'})
        except Exception as e:
            return Response({'status':404,'message':str(e)})



class LoginOTPValidateApi(APIView):
    def post(self,request,*args,**kwargs):
        try:
            if not request.user.is_authenticated:
                return DukanAuth().ValidateOTPLogin(request)
            else:
                return Response({'status':200,'message':'Already Logged in.'})
        except Exception as e:
            return Response({'status':404,'message':str(e)})


class RecoverAccountApi(APIView):
    def post(self,request,*args,**kwargs):
        pass