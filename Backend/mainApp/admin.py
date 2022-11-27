from django.contrib import admin
from .models import Dukaan,Product,DukaanOwner,WishList,Image
# Register your models here.
admin.site.register(Dukaan)
admin.site.register(DukaanOwner)
admin.site.register(Product)
admin.site.register(WishList)
admin.site.register(Image)