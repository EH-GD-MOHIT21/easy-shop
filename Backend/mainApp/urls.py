from django.urls import path
from .views import CreateOrGetDukaanAPI,ProductAPI

urlpatterns = [
    path('createorgetdukaan',CreateOrGetDukaanAPI.as_view()),
    path('createorgetproduct',ProductAPI.as_view()),
]
