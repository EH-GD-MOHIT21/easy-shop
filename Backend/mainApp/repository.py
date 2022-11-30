from .models import Dukaan,DukaanOwner,Product,Image,WishList,Cart,SubCart
from rest_framework.response import Response
from .serializers import DukaanSerializer,DukaanOwnerSerializer,ProductSerializer,ProductMainSerializer,SubCartsSerializer
from paymentsApp.models import Order
from paymentsApp.serializers import OrderSerializer

class DukanCreationUtils:
    def create_dukaan(self,request):
        print(request.data)
        print(request.FILES)
        user = request.user
        intro = request.data['intro']
        description = request.data['description']
        logo = request.FILES['logo']
        name = request.data['name']
        category = request.data['category']
        seller_address = request.data['seller_address']
        model = Dukaan()
        model.name,model.category = name,category
        model.seller_address,model.description = seller_address,description
        model.intro,model.creator = intro,user
        model.logo = logo
        model.save()
        return Response({'status':200,'message':'success','url':model.slug})


    def list_dukaan(self,request):
        user = request.user
        created_dukaans = Dukaan.objects.filter(creator=user)
        other_dukaans = DukaanOwner.objects.filter(owner=user)
        cd_serializer = DukaanSerializer(created_dukaans,many=True)
        od_serializer = DukaanOwnerSerializer(other_dukaans,many=True)
        owner_shop = cd_serializer.data
        other_owner_shop = od_serializer.data
        return Response({'status':200,'message':'success','owner_shop':owner_shop,'other_owner_shop':other_owner_shop})


    def add_product(self,request):
        user = request.user
        name = request.data['productName']
        dukaan = request.data['dukaan']
        # check dukaan with user permission -- pending
        desc = request.data['productDescription']
        category = request.data['productCategory']
        price = request.data['productPrice']
        discountedPrice = request.data['discountedPrice']
        imageList = request.FILES.getlist('imageList')
        Addvarient = request.data['Addvarient']
        model = Product()
        dukaan = Dukaan.objects.get(slug=dukaan)
        model.dukaan = dukaan
        model.name = name
        model.description = desc
        model.category = category
        model.price = price
        model.discounted_price = discountedPrice
        model.additional_info = Addvarient
        model.save()
        for image in imageList:
            print(image)
            img = Image()
            img.url = image
            img.save()
            model.images.add(img)
            model.save()
        return Response({'status':200,'message':'success'})

    # list the products of a shop
    def list_product(self,request,dukaan,category):
        dukaan = Dukaan.objects.get(slug=dukaan)
        if category != 'cat_all':
            prods = Product.objects.filter(dukaan=dukaan,category=category)
        else:
            prods = Product.objects.filter(dukaan=dukaan)
        serializer = ProductMainSerializer(prods,many=True)
        return Response({'status':200,'message':'success','data':serializer.data})
    
    def product_detail(self,request,dukaan,prodid):
        product = Product.objects.get(id=prodid)
        serializer = ProductMainSerializer(product)
        print(serializer.data)
        return Response({'status':200,'message':'success','data':serializer.data})




class DukaanAdditionUtils:

    def add_to_wishlist(self,request):
        user = request.user
        product_id = request.data['product_id']
        product = Product.objects.get(id=int(product_id))
        try:
            model = WishList.objects.get(user=user,product=product)
        except:
            WishList.objects.create(user=user,product=product).save()
        return Response({'status':200,'message':'successfully added product to wishlist.'})


    def list_wishlist(self,request):
        model = WishList.objects.filter(user=request.user)
        serializer = ProductSerializer(model,many=True)
        return Response({'status':200,'message':'success','data':serializer.data})


    def list_dukaan_category(self,request,slug):
        dukaan = str(Dukaan.objects.get(slug=slug).id)
        products = Product.objects.raw(f'SELECT mainApp_product.id, mainApp_product.dukaan_id, mainApp_product.name, mainApp_product.description, mainApp_product.price, mainApp_product.discounted_price, mainApp_product.category, mainApp_product.additional_info FROM mainApp_product WHERE mainApp_product.dukaan_id = {dukaan} GROUP BY mainApp_product.category')
        main_data = []
        for product in products:
            data = {}
            data['category'] = str(product.category)
            data['images'] = []
            imgs = product.images.all()
            for img in imgs:
                data['images'].append(str(img.url))
            main_data.append(data)
        return Response({'status':200,'message':'success','category':main_data})
        

        
class UserCartUtils:
    def modify_cart(self,request):
        # data = [{'productid':1,"quantity":2},{'productid':2,"quantity":3}]
        data = request.data
        cart,_ = Cart.objects.get_or_create(user=request.user)
        subcarts = cart.sub_carts.all()
        for subcart in subcarts:
            subcart.delete()
        for cart_item in data:
            product = Product.objects.get(id=int(cart_item['productid']))
            model = SubCart()
            model.product,model.quantity = product,int(cart_item['quantity'])
            model.save()
            cart.sub_carts.add(model)
        cart.save()
        return self.list_cart_items(request)

    def list_cart_items(self,request):
        user = request.user
        sub_cart = Cart.objects.get(user=user).sub_carts
        sub_cart = sub_cart.all()
        final_price = 0
        data = SubCartsSerializer(sub_cart,many=True).data
        print(data)
        for index,item in enumerate(sub_cart):
            final_price += item.product.discounted_price * item.quantity
        return Response({'status':200,'message':'success','data':data,'final_price':final_price})
    
    def Cartorders(self,request):
        orders = Order.objects.filter(user=request.user)
        data = OrderSerializer(orders,many=True).data
        return Response({'status':200,'message':'success','data':data})

