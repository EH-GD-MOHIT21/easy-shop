from .exceptions import InvalidCredentials, WaitTimeError, UserNotExists
from django.contrib.auth import authenticate, login
from rest_framework.response import Response
from django.core.cache import cache
from random import randint, choices
from .tasks import send_mail_celery
from .models import User
from django.conf import settings
from django.contrib.auth.password_validation import validate_password


class DukanAuthUtils:

    def IsUsernameAvailable(self, request):
        return User.objects.get(username=request.data["username"])

    def IsEmailAvailable(self, request):
        return User.objects.get(email=request.data["email"])

    def GenerateSlug(self, length):
        valid_chars = settings.VALID_CHARS
        return "".join(choices(valid_chars, k=length))

    def isWeakPassword(self, password):
        '''
            Returns None or Raise Validation Err
        '''
        return validate_password(password)


class DukanAuth:

    def LoginUser(self, request):
        data = request.data
        username = data.get('username')
        password = data.get('password')
        if username and password:
            if '@' in username:
                try:
                    username = User.objects.get(email=username).username
                except:
                    raise InvalidCredentials()
            user = authenticate(request, username=username, password=password)
            if user is None:
                raise InvalidCredentials()
            else:
                if user.two_factor_auth:
                    if cache.get(user.email):
                        raise WaitTimeError()

                    # procced for two factor
                    otp = randint(100000, 999999)

                    context = {
                        "password": password,
                        "otp": otp
                    }

                    cache.set(user.email, context, 300)

                    # send the mail using celery

                    send_mail_celery.delay(
                        to=[user.email],

                        subject=f'''Hey {user.first_name}! Your OTP is here for login on apnidukan.''',

                        message=f"""Your One time Password for login is {otp}.\n\nPlease Don't share the
                                    password with anyone.\n\nPlease Change Your password immediatly in case it's not you.\n\nThanks & Regards\nTeam Apni Dukaan"""

                    )

                    return Response({'status': 200, 'message': 'OTP delivered successfully.'})

                else:
                    login(request, user)
                    return Response({'status': 200, 'message': 'User logged in successfully.'})
        else:
            raise InvalidCredentials("Empty Credentials Provided.")

    def ValidateOTPLogin(self, request):
        username = request.data.get('username')
        try:
            otp = int(request.data.get('otp').strip())
        except:
            return Response({'status': 400, 'message': 'Empty OTP or Invalid OTP provided.'})
        if '@' not in username:
            og_user = User.objects.get(username=username)
            email = og_user.email
        else:
            og_user = User.objects.get(email=username)
            email = username
            username = og_user.username
        data = cache.get(email)
        if not data:
            raise UserNotExists()

        user = authenticate(username=username, password=data["password"])

        if user is None:
            return Response({'status': 400, 'message': 'Invalid Credentials.'})
        if otp != data["otp"]:
            return Response({'status': 400, 'message': 'OTP did not match'})

        login(request, user)
        cache.delete(email)
        return Response({'status': 200, 'message': 'successfully logged in.'})

    def RegisterUser(self, request):
        data = request.data
        first_name = data.get("first_name")
        middle_name = data.get("middle_name")
        last_name = data.get("last_name")
        email = data.get("email")
        mob_name = data.get("mobile_no")
        username = data.get("username")
        password = data.get("password")
        cnfrpassword = data.get("cnfrpassword")
        # access data
        # validate data
        otp = randint(100000, 999999)
        send_mail_celery.delay(
            to=[email],

            subject=f'''Hey {first_name}! Your OTP is here for login on apnidukan.''',

            message=f"""Your One time Password for Register is {otp}.\n\nPlease Don't share the
                                    password with anyone.\n\nThanks & Regards\nTeam Apni Dukaan"""
        )
        context = {
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "username": username,
            "password": password,
            "otp": otp
        }
        cache.set(email, context, 300)
        return Response({'status': 200, 'message': 'OTP sent on provided mail id please verify to continue.'})

    def ValidateRegisterUser(self, request):
        email = request.data.get('email')
        try:
            otp = int(request.data.get('otp').strip())
        except:
            return Response({'status': 400, 'message': 'Empty OTP or Invalid OTP provided.'})
        data = cache.get(email)
        if not data:
            raise UserNotExists()
        if data['otp'] == otp:
            # save the models here
            cache.delete(email)
            return Response({'status': 200, 'message': 'successfully created account.'})
        else:
            return Response({'status': 200, 'message': 'OTP did not match.'})

    def RecoverAccount(self, request):
        email = email = request.data['email']
        if '@' in email:
            user = User.objects.get(email=email)
            email = user.email
        else:
            user = User.objects.get(username=email)
            email = user.email
        if cache.get(email):
            return Response({'status': 'you have one pending request please try after 5 minutes.'})
        else:
            rint = randint(70, 120)
            token = DukanAuthUtils().GenerateSlug(rint)
            cache.set(email, token, 300)
            print(token)
            # send email
            send_mail_celery.delay(
                to=[email],

                subject=f'''Dear {user.username}! Your Password Reset Link is here for apnidukan.''',

                message=f"""Your One time Password Reset Link is http://127.0.0.1:3000/Verify/{token}/{email}.\n\nPlease Don't share the
                                    Link with anyone.\n\nThanks & Regards\nTeam Apni Dukaan"""
            )
            return Response({'status': 200, 'message': 'Reset Link has been sent on email.'})

    def ValidateRecoverToken(self, request, *args, **kwargs):
        email = request.data['email']
        token = request.data['token']
        password = request.data['password']
        cpassword = request.data['cpassword']
        if '@' in email:
            user = User.objects.get(email=email)
            email = user.email
        else:
            user = User.objects.get(username=email)
            email = user.email
        if not cache.get(email):
            return Response({'status': 'Looks Like the Link has Expired or you\'ve not generated it.'})
        if cache.get(email).strip() != token.strip():
            return Response({'status': 'Invalid Token or Expired please Retry.'})
        DukanAuthUtils().isWeakPassword(password)
        if password != cpassword:
            return Response({'status': 404, 'message': 'Both Password does not match.'})
        user.set_password(password)
        user.save()
        send_mail_celery.delay(
            to=[email],

            subject=f'''Hey {user.username}! Your password has been changed on apnidukan.''',

            message=f"""Hey {user.username}! Your password has been changed on apnidukan.\n\n\n\nThanks&Regards\n\nApniDukan"""
        )
        cache.delete(email)
        return Response({'status': 'success', 'message': 'Password Change success!'})
