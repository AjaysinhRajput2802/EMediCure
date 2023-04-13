from rest_framework import generics,status
from .serializers import *
from Medical.models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import *

class StockCView(generics.ListCreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = StockCRUDS
    queryset = StockItem.objects.all()

class StockRUDView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (AllowAny,)
    serializer_class = StockCRUDS
    queryset = StockItem.objects.all()

class BillItemCView(generics.ListCreateAPIView):
    permission_classes = (AllowAny,)
    queryset = BillItem.objects.all()
    serializer_class = BillItemCS
    
class BillItemRUDView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (AllowAny,)
    serializer_class = BillItemCS
    queryset = BillItem.objects.all()

    def perform_destroy(self, instance):
        medName = instance.medName
        medName.addQuantity(instance.quantity)
        return super().perform_destroy(instance)

class BillView(generics.ListCreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = BillSerilizers
    queryset = Bill.objects.all()

             

class BillRUDView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (AllowAny,)
    serializer_class = BillSerilizers
    queryset = Bill.objects.all()

    def perform_destroy(self, instance):
        bill = Bill.objects.get(pk=instance.pk)
        billitems = bill.BillItems.all()
        for item in billitems:
            medName = item.medName
            medName.addQuantity(item.quantity)
        return super().perform_destroy(instance)


# ============================================================================================================================================================

