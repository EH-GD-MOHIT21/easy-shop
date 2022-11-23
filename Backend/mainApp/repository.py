from .models import Dukaan,DukaanOwner
from rest_framework.response import Response
from .serializers import DukaanSerializer,DukaanOwnerSerializer

class DukanCreationUtils:
    def create_dukaan(self,request):
        user = request.user
        intro = request.data['intro']
        description = request.data['description']
        logo = request.FILES['logo']
        name = request.data['name']
        category = request.data['category']
        seller_address = request.data['seller_address']
        model = Dukaan()
        model.name,model.category = name,category
        model.seller_address,model.description = seller_address,description
        model.intro,model.creator = intro,user
        model.logo = logo
        model.save()
        return Response({'status':200,'message':'success','url':model.slug})


    def list_dukaan(self,request):
        user = request.user
        created_dukaans = Dukaan.objects.filter(creator=user)
        other_dukaans = DukaanOwner.objects.filter(owner=user)
        cd_serializer = DukaanSerializer(created_dukaans,many=True)
        od_serializer = DukaanOwnerSerializer(other_dukaans,many=True)
        owner_shop = cd_serializer.data
        other_owner_shop = od_serializer.data
        return Response({'status':200,'message':'success','owner_shop':owner_shop,'other_owner_shop':other_owner_shop})
