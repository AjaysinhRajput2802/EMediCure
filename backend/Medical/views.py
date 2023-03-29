from django.shortcuts import render
from .models import medicalShop,medicine,staffMember,stock,stockItem,bill,billItem,company,Profile
from .serializers import medicalShopSerializers,medicineSerializers,staffMemberSerializers,stockItemSerializers,stockSerializers,companySerializers,billItemSerializers,billSerializers,ProfileSerializers

from rest_framework import generics
from rest_framework.permissions import IsAdminUser
# Create your views here.

class MedicalShopC(generics.CreateAPIView,generics.ListAPIView):
    queryset = medicalShop.objects.all()
    serializer_class = medicalShopSerializers
    # permission_classes = [IsAdminUser]

class MedicalShopRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = medicalShop.objects.all()
    serializer_class = medicalShopSerializers
    # permission_classes = [IsAdminUser]


class MedicineC(generics.CreateAPIView,generics.ListAPIView):
    queryset = medicine.objects.all()
    serializer_class = medicineSerializers
    # permission_classes = [IsAdminUser]

class MedicineRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = medicine.objects.all()
    serializer_class = medicineSerializers
    # permission_classes = [IsAdminUser]

class staffMemberC(generics.CreateAPIView,generics.ListAPIView):
    queryset = staffMember.objects.all()
    serializer_class = staffMemberSerializers
    # permission_classes = [IsAdminUser]

class staffMemberRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = staffMember.objects.all()
    serializer_class = staffMemberSerializers
    # permission_classes = [IsAdminUser]


class companyC(generics.CreateAPIView,generics.ListAPIView):
    queryset = company.objects.all()
    serializer_class = companySerializers
    # permission_classes = [IsAdminUser]

class companyRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = company.objects.all()
    serializer_class = companySerializers
    # permission_classes = [IsAdminUser]

class stockC(generics.CreateAPIView,generics.ListAPIView):
    queryset = stock.objects.all()
    serializer_class = stockSerializers
    # permission_classes = [IsAdminUser]

class stockRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = stock.objects.all()
    serializer_class = stockSerializers
    # permission_classes = [IsAdminUser]

class stockItemC(generics.CreateAPIView,generics.ListAPIView):
    queryset = stockItem.objects.all()
    serializer_class = stockItemSerializers
    # permission_classes = [IsAdminUser]

class stockItemRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = stockItem.objects.all()
    serializer_class = stockItemSerializers
    # permission_classes = [IsAdminUser]

class billC(generics.CreateAPIView,generics.ListAPIView):
    queryset = bill.objects.all()
    serializer_class = billSerializers
    # permission_classes = [IsAdminUser]

class billRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = bill.objects.all()
    serializer_class = billSerializers
    # permission_classes = [IsAdminUser]


class billItemC(generics.CreateAPIView,generics.ListAPIView):
    queryset = billItem.objects.all()
    serializer_class = billItemSerializers
    # permission_classes = [IsAdminUser]

class billItemRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = billItem.objects.all()
    serializer_class = billItemSerializers



class ProfileC(generics.CreateAPIView,generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializers
    # permission_classes = [IsAdminUser]

class ProfileRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializers




