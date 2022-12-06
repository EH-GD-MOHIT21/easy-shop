from .models import Dukaan,DukaanOwner,Product,Image,WishList,Cart,SubCart,WithdrawlForm
from rest_framework.response import Response
from .serializers import DukaanSerializer,DukaanOwnerSerializer,ProductSerializer,ProductMainSerializer,SubCartsSerializer,Withdrawlformserializer
from dukanAuthApp.models import User
from django.utils import timezone

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


    def delete_dukaan(self,request):
        dukaan = Dukaan.objects.get(slug=request.data['dukaan'])
        Dukaanowner = DukaanOwner.objects.filter(owner=request.user,dukaan=dukaan,perms__icontains='DELETE')
        if request.user == dukaan.creator or Dukaanowner.exists():
            dukaan.delete()
            return Response({'status':200,'message':'Dukaan deleted successfully.'})
        return Response({'status':400,'message':'You are not authorised to perform this action.'})


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
    
    def add_owner_ship(self,request):
        dukaan = request.data['dukaan']
        username = request.data['username']
        dukaan = Dukaan.objects.get(slug=dukaan)
        print(dukaan,username,request.data["permission"])
        user = User.objects.get(username=username)
        do,_ = DukaanOwner.objects.get_or_create(owner=user,dukaan=dukaan)
        if request.data["permission"] == '__remove__':
            do.delete()
            return Response({'status':200,'message':f'successfully updated permission for user {username}'})
        do.perms = request.data["permission"]
        do.save()
        return Response({'status':200,'message':f'successfully updated permission for user {username}'})

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


    def get_withdrawal_req(self,request):
        withdrawalreq = WithdrawlForm.objects.filter(user=request.user)
        serializer = Withdrawlformserializer(withdrawalreq,many=True)
        return Response({'status':200,'message':'success','data':serializer.data})


    def add_withdrawal_req(self,request):
        user = request.user
        amount = float(request.data['amount'])
        dukaan = Dukaan.objects.get(slug=request.data['dukaan'])
        pan_no = request.data['panno']
        allobjs = WithdrawlForm.objects.filter(user=request.user).order_by('-id')
        if allobjs.exists():
            lastone = allobjs[0]
            if (timezone.now()-lastone.date).days < 3:
                return Response({'status':400,'message':'You recently have an pending req/approved request please wait for 3 days for next request.'})
        model = WithdrawlForm()
        model.user,model.amount = user,amount
        model.dukaan,model.pan_no = dukaan,pan_no
        model.additional_details = request.data['additional_details']
        model.save()
        return Response({'status':200,'message':'success'})

        
class UserCartUtils:
    def modify_cart(self,request):
        # data = [{'productid':1,"quantity":2},{'productid':2,"quantity":3}]
        data = request.data
        cart,_ = Cart.objects.get_or_create(user=request.user)
        subcarts = cart.sub_carts.all()
        for subcart in subcarts:
            subcart.delete()
        for cart_item in data:
            product = Product.objects.get(id=int(cart_item['product_id']))
            model = SubCart()
            model.product,model.quantity = product,int(cart_item['quantity'])
            model.save()
            cart.sub_carts.add(model)
        cart.save()
        return self.list_cart_items(request)


    def add_cart_items(self,request):
        prod_id = int(request.data['product_id'])
        quantity = int(request.data['quantity'])
        product = Product.objects.get(id=prod_id)
        cart = Cart.objects.get(user=request.user)
        sub_carts = cart.sub_carts.all()
        products = sub_carts.only('product')
        if (product not in products):
            sb = SubCart(product=product,quantity=quantity)
            sb.save()
            cart.sub_carts.add(sb)
            cart.save()
        else:
            for index,prod in enumerate(products):
                if prod.id == product.id:
                    sub_carts[index].quantity = quantity
                    sub_carts.save()
                    break
        return self.list_cart_items(request)


    def list_cart_items(self,request):
        user = request.user
        sub_cart = Cart.objects.get(user=user)
        sub_cart = sub_cart.sub_carts.all()
        final_price = 0
        data = SubCartsSerializer(sub_cart,many=True).data
        print(data)
        for index,item in enumerate(sub_cart):
            final_price += item.product.discounted_price * item.quantity
        return Response({'status':200,'message':'success','data':data,'final_price':final_price})
