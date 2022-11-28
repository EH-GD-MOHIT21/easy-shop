from rest_framework.serializers import ModelSerializer
from .models import Dukaan,DukaanOwner,Product,Image
from rest_framework import serializers

class DukaanSerializer(ModelSerializer):
    class Meta:
        model = Dukaan
        fields = "__all__"


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
    
class ProductSerializer(ModelSerializer):
    name = serializers.ReadOnlyField(source='product.name')
    description = serializers.ReadOnlyField(source='product.description')
    price = serializers.ReadOnlyField(source='product.price')
    discounted_price = serializers.ReadOnlyField(source='product.discounted_price')
    category = serializers.ReadOnlyField(source='product.category')
    additional_info = serializers.ReadOnlyField(source='product.additional_info')
    dukaan = serializers.ReadOnlyField(source='product.dukaan.slug')
    intro = serializers.ReadOnlyField(source='product.dukaan.intro')
    creator = serializers.ReadOnlyField(source='product.dukaan.creator.username')
    logo = serializers.ImageField(source='product.dukaan.logo',read_only=True)
    seller_address = serializers.ReadOnlyField(source='product.dukaan.seller_address')
    shop_name = serializers.ReadOnlyField(source='product.dukaan.name')
    
    class Meta:
        model = Product
        fields = ["name","description","price","discounted_price","category","additional_info","dukaan","intro","creator","logo","seller_address","shop_name"]


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
        fields = ["name","description","price","discounted_price","category","additional_info","images","dukaan","intro","creator","logo","seller_address","shop_name"]