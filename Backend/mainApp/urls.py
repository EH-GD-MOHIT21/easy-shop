from django.urls import path
from .views import CreateOrGetDukaanAPI,ProductAPI,WishlistAPI

urlpatterns = [
    path('createorgetdukaan',CreateOrGetDukaanAPI.as_view()),
    path('createorgetproduct',ProductAPI.as_view()),
    path('listwishlist',WishlistAPI.as_view())
]
