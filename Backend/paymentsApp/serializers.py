from rest_framework.serializers import ModelSerializer
from .models import Order
from rest_framework import serializers
from mainApp.serializers import SubCartsSerializer

class OrderSerializer(ModelSerializer):
    order_items = SubCartsSerializer(read_only=True,many=True)

    class Meta:
        model = Order
        fields = ["order_items","order_id","amount","order_at","order_status"]