from .models import Order
from .serializers import OrderSerializer
from rest_framework.response import Response


class PaymentUtils:
    def Cartorders(self,request):
        orders = Order.objects.filter(user=request.user)
        data = OrderSerializer(orders,many=True).data
        print(data)
        return Response({'status':200,'message':'success','data':data})