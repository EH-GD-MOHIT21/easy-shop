from django.db import models
from dukanAuthApp.models import User
from datetime import datetime
from django.utils import timezone

# Create your models here.

class Order(models.Model):
    order_id = models.SlugField()
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    address = models.TextField()
    email = models.EmailField()
    phone_no = models.CharField(max_length=12)
    amount = models.FloatField(default=0)
    order_at = models.DateTimeField()
    order_status = models.CharField(max_length=10)


    def save(self,*args,**kwargs):
        if not isinstance(self.order_at,datetime):
            self.order_at = timezone.now()
        super(Order, self).save(*args, **kwargs)