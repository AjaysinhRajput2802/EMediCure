from django.shortcuts import render
from . import views
from . import serializers
from . import models
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
# Create your views here.


class MedicalShopC(generics.CreateAPIView, generics.ListAPIView):
    queryset = models.MedicalShop.objects.all()
    serializer_class = serializers.MedicalShopSerializers
    # permission_classes = [IsAdminUser]


class MedicalShopRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.MedicalShop.objects.all()
    serializer_class = serializers.MedicalShopSerializers
    # permission_classes = [IsAdminUser]


class MedicineC(generics.CreateAPIView, generics.ListAPIView):
    queryset = models.Medicine.objects.all()
    serializer_class = serializers.MedicineSerializers
    # permission_classes = [IsAdminUser]


class MedicineRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Medicine.objects.all()
    serializer_class = serializers.MedicineSerializers
    # permission_classes = [IsAdminUser]


class StaffMemberC(generics.CreateAPIView, generics.ListAPIView):
    queryset = models.StaffMember.objects.all()
    serializer_class = serializers.StaffMemberSerializers
    # permission_classes = [IsAdminUser]


class StaffMemberRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.StaffMember.objects.all()
    serializer_class = serializers.StaffMemberSerializers
    # permission_classes = [IsAdminUser]


class CompanyC(generics.CreateAPIView, generics.ListAPIView):
    queryset = models.Company.objects.all()
    serializer_class = serializers.CompanySerializers
    # permission_classes = [IsAdminUser]


class CompanyRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Company.objects.all()
    serializer_class = serializers.CompanySerializers
    # permission_classes = [IsAdminUser]


class StockC(generics.CreateAPIView, generics.ListAPIView):
    queryset = models.Stock.objects.all()
    serializer_class = serializers.StockSerializers
    # permission_classes = [IsAdminUser]


class StockRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Stock.objects.all()
    serializer_class = serializers.StockSerializers
    # permission_classes = [IsAdminUser]


class StockItemC(generics.CreateAPIView, generics.ListAPIView):
    queryset = models.StockItem.objects.all()
    serializer_class = serializers.StockItemSerializers
    # permission_classes = [IsAdminUser]


class StockItemRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.StockItem.objects.all()
    serializer_class = serializers.StockItemSerializers
    # permission_classes = [IsAdminUser]


class BillC(generics.CreateAPIView, generics.ListAPIView):
    queryset = models.Bill.objects.all()
    serializer_class = serializers.BillSerializers
    # permission_classes = [IsAdminUser]


class BillRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Bill.objects.all()
    serializer_class = serializers.BillSerializers
    # permission_classes = [IsAdminUser]


class BillItemC(generics.CreateAPIView, generics.ListAPIView):
    queryset = models.BillItem.objects.all()
    serializer_class = serializers.BillItemSerializers
    # permission_classes = [IsAdminUser]


class BillItemRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.BillItem.objects.all()
    serializer_class = serializers.BillItemSerializers


class ProfileC(generics.CreateAPIView, generics.ListAPIView):
    queryset = models.Profile.objects.all()
    serializer_class = serializers.ProfileSerializers
    # permission_classes = [IsAdminUser]


class ProfileRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Profile.objects.all()
    serializer_class = serializers.ProfileSerializers
