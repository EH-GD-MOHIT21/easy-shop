from django.db import models
from dukanAuthApp.models import User
from datetime import datetime
from django.utils import timezone
import string 
from django.utils.text import slugify 
import random 
from django.db.models.signals import pre_save

# Create your models here.

class Image(models.Model):
    pass



class Dukaan(models.Model):
    slug = models.SlugField(max_length = 250, null = True, blank = True)
    creator = models.ForeignKey(User,on_delete=models.CASCADE)
    created_at = models.DateTimeField(null=True,blank=True)
    intro = models.CharField(max_length=100,null=True,blank=True)
    description = models.TextField(null=True,blank=True)
    logo = models.ImageField(null=True,blank=True,upload_to='imgs')
    name = models.CharField(max_length=50)
    category = models.CharField(max_length=60)
    seller_address = models.TextField(null=True,blank=True)
    

    def save(self,*args,**kwargs):
        if not isinstance(self.created_at,datetime):
            self.created_at = timezone.now()
        super(Dukaan, self).save(*args, **kwargs)



class Product(models.Model):
    dukaan = models.ForeignKey(Dukaan,on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    images = models.ManyToManyField(Image)
    price = models.FloatField()




class DukaanOwner(models.Model):
    owner = models.ForeignKey(User,on_delete=models.CASCADE)
    dukaan = models.ForeignKey(Dukaan,on_delete=models.CASCADE)
    perms = models.TextField(default='READ SHOP')
    '''
        perms should be in below format:
            READ SHOP, UPDATE SHOP, DELETE SHOP
            READ SHOP, DELETE SHOP
            READ SHOP
        READ SHOP is default non removeable permission
    '''


'''
    SIGNALS
'''

def random_string_generator(size = 10, chars = string.ascii_lowercase + string.digits): 
    return ''.join(random.choice(chars) for _ in range(size)) 
  
def unique_slug_generator(instance, new_slug = None): 
    if new_slug is not None: 
        slug = new_slug 
    else: 
        slug = slugify(instance.name) 
    Klass = instance.__class__ 
    qs_exists = Klass.objects.filter(slug = slug).exists() 
    if qs_exists: 
        new_slug = "{slug}-{randstr}".format( 
            slug = slug, randstr = random_string_generator(size = 4)) 
        return unique_slug_generator(instance, new_slug = new_slug) 
    return slug 

def pre_save_receiver(sender, instance, *args, **kwargs): 
    if not instance.slug: 
        instance.slug = unique_slug_generator(instance)

pre_save.connect(pre_save_receiver, sender = Dukaan) 
    