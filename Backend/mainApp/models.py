from django.db import models

# Create your models here.

class Image(models.Model):
    pass

class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    images = models.ManyToManyField(Image)

