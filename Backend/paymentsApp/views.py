from django.shortcuts import redirect, render
import razorpay
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.decorators import api_view


@api_view(['POST'])
def createOrder(request):
    global client
    data = request.data

    amount = int(float(data['amount']))

    client = razorpay.Client(auth=(settings.RAZOR_KEY_ID, settings.RAZOR_KEY_SECRET))

    data = {"amount" : amount, "currency" : "INR"}
    payment = client.order.create(data=data)

    return Response({'order_id': payment['id'], 'amount': payment['amount'], 'currency':payment['currency']})

@api_view(['POST'])
def verifySignature(request):
    res = request.data

    params_dict = {
        'razorpay_payment_id' : res['razorpay_paymentId'],
        'razorpay_order_id' : res['razorpay_orderId'],
        'razorpay_signature' : res['razorpay_signature']
    }

    # verifying the signature
    res = client.utility.verify_payment_signature(params_dict)

    if res == True:
        return Response({'status':'Payment Successful'})
    return Response({'status':'Payment Failed'})