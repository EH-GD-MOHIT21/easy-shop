from rest_framework.serializers import ModelSerializer
from .models import Dukaan,DukaanOwner,Product
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
    class Meta:
        model = Product
        fields = "__all__"
