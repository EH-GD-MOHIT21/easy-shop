from django.urls import path
from .views import CreateOrGetDukaanAPI,ProductAPI,WishlistAPI,CartAPI,ListDukaanCategoryAPI

urlpatterns = [
    path('createorgetdukaan',CreateOrGetDukaanAPI.as_view()),
    path('createorgetproduct',ProductAPI.as_view()),
    path('listwishlist',WishlistAPI.as_view()),
    path('modifyorlistcart',CartAPI.as_view()),
    path('listdukaancategory',ListDukaanCategoryAPI.as_view()),
]
