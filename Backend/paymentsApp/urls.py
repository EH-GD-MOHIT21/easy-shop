from django.urls import path
from . import views

urlpatterns = [
    path('createOrder/', views.createOrder),
    path('verifySignature/', views.verifySignature),
    path('cartorder',views.CartOrders.as_view())
]
