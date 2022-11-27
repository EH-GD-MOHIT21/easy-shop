from .models import Dukaan,DukaanOwner,Product,Image,WishList
from rest_framework.response import Response
from .serializers import DukaanSerializer,DukaanOwnerSerializer

class DukanCreationUtils:
    def create_dukaan(self,request):
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
        price = request.data['producPrice']
        discountedPrice = request.data['discountedPrice']
        imageList = request.data['imageList']
        Addvarient = request.data['Addvarient']
        model = Product()
        model.dukaan = dukaan
        model.name = name
        model.description = desc
        model.category = category
        model.price = price
        model.discounted_price = discountedPrice
        model.additional_info = Addvarient
        for image in imageList:
            img = Image()
            img.url = image
            img.save()
            model.images.add(img)
        model.save()
        return Response({'status':200,'message':'success'})

    # list the products of a shop
    def list_product(self,request,dukaan):
        pass



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
        model = WishList.objects.filter(user=request.user).only('product')
        print(model)
        return Response({'status':200,'message':'success'})
