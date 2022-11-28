from django.shortcuts import redirect, render
import razorpay
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from mainApp.models import Cart
from .models import Order


@api_view(['POST'])
def createOrder(request):
    global client

    client = razorpay.Client(auth=(settings.RAZOR_KEY_ID, settings.RAZOR_KEY_SECRET))
    
    cart = Cart.objects.get(user=request.user)
    subcarts = cart.sub_carts.all()
    amount = 0
    for index,item in enumerate(subcarts):
        amount += item.product.discounted_price * item.quantity
    data = {"amount" : amount, "currency" : "INR"}
    payment = client.order.create(data=data)
    model = Order()
    model.order_id = payment['id']
    model.user = request.user
    model.amount = payment['amount']
    model.order_status = "PENDING"
    for subcart in subcarts:
        model.order_items.add(subcart)
    model.save()

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
        # empty cart 
        # order status success
        cart = Cart.objects.get(user=request.user)
        cart.sub_carts = None
        cart.save()
        order = Order.objects.get(order_id=res['razorpay_orderId'])
        order.order_status = 'SUCCESS'
        order.save()
        return Response({'status':'Payment Successful'})
    return Response({'status':'Payment Failed'})