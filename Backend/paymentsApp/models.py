from django.db import models
from dukanAuthApp.models import User
from datetime import datetime
from django.utils import timezone
from mainApp.models import Cart,SubCart

# Create your models here.

class Order(models.Model):
    order_id = models.SlugField()
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    amount = models.FloatField(default=0)
    order_at = models.DateTimeField()
    order_status = models.CharField(max_length=10)
    order_items = models.ManyToManyField(SubCart)
                                                
    def save(self,*args,**kwargs):
        if not isinstance(self.order_at,datetime):
            self.order_at = timezone.now()
        super(Order, self).save(*args, **kwargs)