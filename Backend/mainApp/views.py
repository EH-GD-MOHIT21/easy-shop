from rest_framework.response import Response
from rest_framework.views import APIView
from .repository import DukanCreationUtils,DukaanAdditionUtils,UserCartUtils

# Create your views here.


class CreateOrGetDukaanAPI(APIView):

    def get(self,request,*args,**kwargs):
        try:
            if request.user.is_authenticated:
                return DukanCreationUtils().list_dukaan(request)
            return Response({'status':403,'message':'Please Authenticate Yourself to list dukaans.'})
        except Exception as e:
            return Response({'status':500,'message':str(e)})

    def post(self,request,*args,**kwargs):
        try:
            if request.user.is_authenticated:
                return DukanCreationUtils().create_dukaan(request)
            return Response({'status':403,'message':'Please Authenticate Yourself to create dukaan.'})
        except Exception as e:
            return Response({'status':500,'message':str(e)})



class DeleteDukaanAPI(APIView):
    def post(self,request,*args,**kwargs):
        try:
            if request.user.is_authenticated:
                return DukanCreationUtils().delete_dukaan(request)
            return Response({'status':403,'message':'Please Authenticate Yourself to perform this action.'})
        except Exception as e:
            return Response({'status':500,'message':str(e)})



class WishlistAPI(APIView):

    def get(self,request,*args,**kwargs):
        if request.user.is_authenticated:
            return DukaanAdditionUtils().list_wishlist(request)
        return Response({'status':403,'message':'You need to be authorised to perform this action.'})


    def post(self,request,*args,**kwargs):
        if request.user.is_authenticated:
            return DukaanAdditionUtils().add_to_wishlist(request)
        return Response({'status':403,'message':'You need to be authorised to perform this action.'})



class ProductAPI(APIView):
    # list product for shop
    def get(self,request,*args,**kwargs):
        dukaan = request.GET['dukaan']
        category = request.GET['category']
        try:
            prodid = request.GET['prodid']
            return DukanCreationUtils().product_detail(request,dukaan,prodid)
        
        except:
            return DukanCreationUtils().list_product(request,dukaan,category)

    # create product for shop
    def post(self,request,*args,**kwargs):
        try:
            if request.user.is_authenticated:
                return DukanCreationUtils().add_product(request)
            return Response({'status':403,'message':'Please authenticate yourself to use this function.'})
        except Exception as e:
            return Response({'status':500,'message':str(e)})



class ListDukaanCategoryAPI(APIView):
    def get(self,request,*args,**kwargs):
        slug = request.GET['slug']
        return DukaanAdditionUtils().list_dukaan_category(request,slug)



class CartAPI(APIView):
    def get(self,request,*args,**kwargs):
        if request.user.is_authenticated:
            return UserCartUtils().list_cart_items(request)
        return Response({'status':403,'message':'Please authenticate yourself to use this function.'})

    def post(self,request,*args,**kwargs):
        if request.user.is_authenticated:
            return UserCartUtils().add_cart_items(request)
        return Response({'status':403,'message':'Please Authenticate yourself to use this function.'})
        

    def patch(self,request,*args,**kwargs):
        if request.user.is_authenticated:
            return UserCartUtils().modify_cart(request)
        return Response({'status':403,'message':'Please Authenticate yourself to use this function.'})

class DukaanOwnerPermissions(APIView):
    def post(self,request,*args,**kwargs):
        try:
            if request.user.is_authenticated:
                return DukaanAdditionUtils().add_owner_ship(request)
            return Response({'status':403,'message':'you need to be authorised to perform this action.'})
        except Exception as e:
            return Response({'status':500,'message':str(e)})


class WithDrawalFormReq(APIView):
    def get(self,request,*args,**kwargs):
        try:
            if request.user.is_authenticated:
                return DukaanAdditionUtils().get_withdrawal_req(request)
            return Response({'status':403,'message':'you need to be authorised to perform this action.'})
        except Exception as e:
            return Response({'status':500,'message':str(e)})

    def post(self,request,*args,**kwargs):
        try:
            if request.user.is_authenticated:
                return DukaanAdditionUtils().add_withdrawal_req(request)
            return Response({'status':403,'message':'you need to be authorised to perform this action.'})
        except Exception as e:
            return Response({'status':500,'message':str(e)})