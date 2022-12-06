from .models import Order
from .serializers import OrderSerializer
from rest_framework.response import Response
from mainApp.models import Dukaan,SubCart,Product
import datetime



class PaymentUtils:
    def Cartorders(self,request):
        orders = Order.objects.filter(user=request.user)
        data = OrderSerializer(orders,many=True).data
        print(data)
        return Response({'status':200,'message':'success','data':data})
    

    def OrderDetails(self,request):
        dukaan = Dukaan.objects.filter(creator = request.user)
        products = []
        for duk in dukaan:
            product = Product.objects.filter(dukaan=duk)
            for p in product:
                products.append(p)
        subcarts = []
        for prod in products:
            subbcart = SubCart.objects.filter(product = prod)
            for sub in subbcart:
                subcarts.append(sub)
        orders = []
        for subcart in subcarts:
            order = Order.objects.filter(order_items = subcart)
            for orde in order:
                orders.append(orde)
        main_data = []
        for i in range(7):
            data = {}
            d = (datetime.datetime.today() - datetime.timedelta(days=i)).date()
            no_prod = 0
            sales = 0
            for ord in orders:
                if (ord.order_at).date()==d and ord.order_status=='SUCCESS':
                    no_prod+=1
                    sales+=ord.amount
            data['date'] = d
            data['sales'] = sales
            data['products'] = no_prod
            main_data.append(data)
        return Response({'status':200,'message':'success','data':main_data})


    def dukaanorders(self,request):
        dukaan = request.GET['dukaan']
        dukaan = Dukaan.objects.get(slug=dukaan)
        products = Product.objects.filter(dukaan=dukaan)
        subcarts = []
        for prod in products:
            subbcart = SubCart.objects.filter(product = prod)
            for sub in subbcart:
                subcarts.append(sub)
        orders = []
        for subcart in subcarts:
            order = Order.objects.filter(order_items = subcart)
            for orde in order:
                orders.append(orde)
        main_data = []
        for order in orders:
            data = {}
            data['order_id'],data['user'],data['amount'] = order.order_id,order.user.username,order.amount
            data['order_at'],data['order_status'] = order.order_at,order.order_status
            main_data.append(data)

        return Response({'status':200,'message':'success','data':main_data})
