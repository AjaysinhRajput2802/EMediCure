from  Medical.models import Bill,StockItem,BillItem
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework import generics
from .serializers import *
from django.db.models import Q,Sum,Count,F,ExpressionWrapper
from rest_framework.response import Response
# Sales View from Bills
class SalesView(generics.ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = SalesSerializers
    def get_queryset(self):
        shopId = self.kwargs['shopId']
        queryset = Bill.objects.filter(medShop=shopId).values(day=F('generatedDate__date')).annotate(sales = Sum('totalAmount'))
        print(queryset)

        return queryset
    
# Purchase View from StockItem with shopId
class PurchaseView(generics.ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = PurchaseSerializers
    def get_queryset(self):
        shopId = self.kwargs['shopId']
        queryset = StockItem.objects.filter(medShop=shopId).values(day=F('arrivalDate__date')).annotate(purchase = Sum(F('price')*F('orderedQuantity')))
       
        return queryset

# Single Medicine Sales from BillItem
class MedicineSalesView(generics.ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = MedicineSalesSerializers
    def get_queryset(self):
        medName = self.kwargs['medName']
        queryset = BillItem.objects.filter(medName=medName).values(day=F('relatedbill__generatedDate__date')).annotate(Medicine_Sales = Sum(F('price')*F('quantity')))
        print(queryset)
        return queryset

# single Medicie Purchase from stockItem 
class MedicinePurchaseView(generics.ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = MedicinePurchaseSerializers
    def get_queryset(self):
        medName = self.kwargs['medName']
        queryset = StockItem.objects.filter(medName=medName).values(day=F('arrivalDate__date')).annotate(Medicine_Purchase = Sum(F('price')*F('orderedQuantity')))
        return queryset

class MedicineTypeSales(generics.ListAPIView):
    permission_classes = (AllowAny),
    serializer_class = MedicineTypeSerializers
    def get_queryset(self):
        shopId = self.kwargs['shopId']
        queryset = BillItem.objects.filter(relatedbill__medShop=shopId).values(type = F('medName__medType')).annotate(amount = Sum(F('price')*F('quantity')))

        return queryset
