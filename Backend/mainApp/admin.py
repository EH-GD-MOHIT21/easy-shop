from django.contrib import admin
from .models import Dukaan,Product,DukaanOwner,WishList,Image,Cart,SubCart,WithdrawlForm
# Register your models here.
admin.site.register(Dukaan)
admin.site.register(DukaanOwner)
admin.site.register(Product)
admin.site.register(WishList)
admin.site.register(Image)
admin.site.register(Cart)
admin.site.register(SubCart)
admin.site.register(WithdrawlForm)