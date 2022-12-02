from rest_framework.serializers import ModelSerializer
from .models import Dukaan,DukaanOwner,Product,Image,SubCart,WishList,WithdrawlForm
from rest_framework import serializers
from dukanAuthApp.models import User

class DukaanSerializer(ModelSerializer):
    class Meta:
        model = Dukaan
        fields = "__all__"

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name','middle_name','last_name','username']

class DukaanOwnerSerializer(ModelSerializer):
    slug = serializers.ReadOnlyField(source='dukaan.slug')
    creator = serializers.ReadOnlyField(source='dukaan.creator.username')
    created_at = serializers.ReadOnlyField(source='dukaan.created_at')
    intro = serializers.ReadOnlyField(source='dukaan.intro')
    description = serializers.ReadOnlyField(source='dukaan.description')
    logo = serializers.ImageField(source='dukaan.logo',read_only=True)
    name = serializers.ReadOnlyField(source='dukaan.name')
    category = serializers.ReadOnlyField(source='dukaan.category')
    seller_address = serializers.ReadOnlyField(source='dukaan.seller_address')

    class Meta:
        model = DukaanOwner
        fields = ["owner","perms","id","slug","creator","created_at","intro","description","logo","name","category","seller_address"]

class ImageSerializer(ModelSerializer):
    class Meta:
        model = Image
        fields = "__all__"


class ProductMainSerializer(ModelSerializer):
    name = serializers.ReadOnlyField()
    description = serializers.ReadOnlyField()
    price = serializers.ReadOnlyField()
    discounted_price = serializers.ReadOnlyField()
    category = serializers.ReadOnlyField()
    additional_info = serializers.ReadOnlyField()
    dukaan = serializers.ReadOnlyField(source='dukaan.slug')
    intro = serializers.ReadOnlyField(source='dukaan.intro')
    creator = serializers.ReadOnlyField(source='dukaan.creator.username')
    logo = serializers.ImageField(source='dukaan.logo',read_only=True)
    seller_address = serializers.ReadOnlyField(source='dukaan.seller_address')
    shop_name = serializers.ReadOnlyField(source='dukaan.name')
    images = ImageSerializer(read_only=True,many=True)
    class Meta:
        model = Product
        fields = ["id","name","description","price","discounted_price","category","additional_info","images","dukaan","intro","creator","logo","seller_address","shop_name"]
    
class ProductSerializer(ModelSerializer):
    product = ProductMainSerializer(read_only=True)
    
    class Meta:
        model = WishList
        fields = ["product"]



        

class SubCartsSerializer(ModelSerializer):
    product = ProductMainSerializer(read_only=True)
    quantity = serializers.ReadOnlyField(   )
    class Meta:
        model = SubCart
        fields = ["product","quantity"]


class Withdrawlformserializer(ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    email = serializers.ReadOnlyField(source='user.email')
    slug = serializers.ReadOnlyField(source='dukaan.slug')
    name = serializers.ReadOnlyField(source='dukaan.name')
    seller_address = serializers.ReadOnlyField(source='dukaan.seller_address')
    class Meta:
        model = WithdrawlForm
        fields = ["amount","pan_no","date","status","username","email","name","seller_address","slug","additional_details"]