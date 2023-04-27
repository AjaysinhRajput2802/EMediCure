from django.forms import ValidationError
from . import serializers, models
from rest_framework import generics
from rest_framework.permissions import *
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

class MedicalShopC(generics.CreateAPIView, generics.ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = serializers.MedicalShopSerializers
    queryset = models.MedicalShop.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['shopOwner', 'shopSupervisor']


class MedicalShopRUD(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (AllowAny,)
    queryset = models.MedicalShop.objects.all()
    serializer_class = serializers.MedicalShopSerializers


class MedicineC(generics.CreateAPIView, generics.ListAPIView):
    permission_classes = (AllowAny,)
    queryset = models.Medicine.objects.all()
    serializer_class = serializers.MedicineSerializers
    filter_backends = [DjangoFilterBackend,filters.SearchFilter]
    filterset_fields = ['medShop','medName','medDes']
    search_fields = ['medName']


class MedicineRUD(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (AllowAny,)
    queryset = models.Medicine.objects.all()
    serializer_class = serializers.MedicineSerializers

    def perform_destroy(self, instance):
        try:
            if instance.StockItems.count or instance.billItems.count:
                instance.soft_delete()
            else:
                return super().perform_destroy(instance)
        except Exception as e:
            raise ValidationError('%(error)', params={'error': e.message[0]})


class StaffMemberC(generics.CreateAPIView, generics.ListAPIView):
    permission_classes = (AllowAny,)
    queryset = models.StaffMember.objects.all()
    serializer_class = serializers.StaffMemberSerializers
    filter_backends = [DjangoFilterBackend,]
    filterset_fields = ['medShop']

class StaffMemberRUD(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (AllowAny,)
    queryset = models.StaffMember.objects.all()
    serializer_class = serializers.StaffMemberSerializers


class CompanyC(generics.CreateAPIView, generics.ListAPIView):
    permission_classes = (AllowAny,)
    queryset = models.Company.objects.all()
    serializer_class = serializers.CompanySerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['medShop']


class CompanyRUD(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (AllowAny,)
    queryset = models.Company.objects.all()
    serializer_class = serializers.CompanySerializers


class StockItemC(generics.CreateAPIView, generics.ListAPIView):
    permission_classes = (AllowAny,)
    queryset = models.StockItem.objects.all().order_by('-arrivalDate')
    serializer_class = serializers.StockItemSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['medShop']


class StockItemRUD(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (AllowAny,)
    queryset = models.StockItem.objects.all()
    serializer_class = serializers.StockItemSerializers


# class BillC(generics.CreateAPIView, generics.ListAPIView):
#     permission_classes = (AllowAny,)
#     queryset = models.Bill.objects.all()
#     serializer_class = serializers.BillSerializers


# class BillRUD(generics.RetrieveUpdateDestroyAPIView):
#     permission_classes = (AllowAny,)
#     queryset = models.Bill.objects.all()
#     serializer_class = serializers.BillSerializers


class BillItemC(generics.CreateAPIView, generics.ListAPIView):
    permission_classes = (AllowAny,)
    queryset = models.BillItem.objects.all()
    serializer_class = serializers.BillItemSerializers


class BillItemRUD(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (AllowAny,)
    queryset = models.BillItem.objects.all()
    serializer_class = serializers.BillItemSerializers

    def perform_destroy(self, instance):
        medName = instance.medName
        medName.addQuantity(instance.quantity)
        return super().perform_destroy(instance)


class ProfileC(generics.CreateAPIView, generics.ListAPIView):
    permission_classes = (AllowAny,)
    queryset = models.Profile.objects.all()
    serializer_class = serializers.ProfileSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user']

class ProfileRUD(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = models.Profile.objects.all()
    serializer_class = serializers.ProfileSerializers

# class UserRUD(generics.RetrieveUpdateDestroyAPIView):
#     permission_classes = (IsAuthenticated,)
#     queryset = models.User.objects.all()
#     serializer_class = serializers.UserSerializers


class BillView(generics.ListCreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = serializers.BillSerilizers
    queryset = models.Bill.objects.all().order_by('-pk')
    filter_backends = [DjangoFilterBackend,filters.SearchFilter]
    filterset_fields = ['medShop']
    search_fields = ['custName']

class BillRUDView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (AllowAny,)
    serializer_class = serializers.BillSerilizers
    queryset = models.Bill.objects.all()

    def perform_destroy(self, instance):
        bill = models.Bill.objects.get(pk=instance.pk)
        billitems = bill.BillItems.all()
        for item in billitems:
            medName = item.medName
            medName.addQuantity(item.quantity)
        return super().perform_destroy(instance)

    
