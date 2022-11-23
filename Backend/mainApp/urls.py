from django.urls import path
from .views import CreateOrGetDukaanAPI

urlpatterns = [
    path('createorgetdukaan',CreateOrGetDukaanAPI.as_view()),
]
