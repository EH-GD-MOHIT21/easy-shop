from django.urls import path
from .views import CreateOrGetDukaanAPI,ProductAPI,WishlistAPI,CartAPI,ListDukaanCategoryAPI,DukaanOwnerPermissions,DeleteDukaanAPI,WithDrawalFormReq

urlpatterns = [
    path('createorgetdukaan',CreateOrGetDukaanAPI.as_view()),
    path('createorgetproduct',ProductAPI.as_view()),
    path('listwishlist',WishlistAPI.as_view()),
    path('modifyorlistcart',CartAPI.as_view()),
    path('listdukaancategory',ListDukaanCategoryAPI.as_view()),
    path('managepermission',DukaanOwnerPermissions.as_view()),
    path('deletedukaan',DeleteDukaanAPI.as_view()),
    path('withdrawlreq',WithDrawalFormReq.as_view()),

]
