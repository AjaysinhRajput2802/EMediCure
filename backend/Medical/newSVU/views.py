from rest_framework import generics,status
from .serializers import *
from Medical.models import *
from rest_framework.views import APIView
from rest_framework.response import Response

class StockCView(generics.ListCreateAPIView):
    serializer_class = StockCRUDS
    queryset = StockItem.objects.all()

class StockRUDView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = StockCRUDS
    queryset = StockItem.objects.all()

class BillItemCView(generics.ListCreateAPIView):
    queryset = BillItem.objects.all()
    serializer_class = BillItemCS
    
class BillItemRUDView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BillItemCS
    queryset = BillItem.objects.all()

    def perform_destroy(self, instance):
        medName = instance.medName
        medName.addQuantity(instance.quantity)
        return super().perform_destroy(instance)

class BillView(generics.ListCreateAPIView):
    serializer_class = BillSerilizers
    queryset = Bill.objects.all()

             

class BillRUDView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BillSerilizers
    queryset = Bill.objects.all()


# ============================================================================================================================================================

