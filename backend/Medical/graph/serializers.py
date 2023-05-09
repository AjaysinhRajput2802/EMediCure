from rest_framework import serializers
from Medical.models import Bill,BillItem,StockItem

class SalesSerializers(serializers.ModelSerializer):
    sales = serializers.DecimalField(decimal_places=2, max_digits=10)
    day = serializers.DateField()
    class Meta:
        model = Bill
        fields = ('pk','generatedDate','totalAmount','sales','day')

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['day']=instance['day'].strftime("%d/%m/%Y")
        return rep

class PurchaseSerializers(serializers.ModelSerializer):
    purchase = serializers.DecimalField(decimal_places=2, max_digits=10)
    day   = serializers.DateField()
    class Meta:
        model = StockItem
        fields = ('id','arrivalDate','purchase','day')
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['day']=instance['day'].strftime("%d/%m/%Y")
        return rep
    
class MedicineSalesSerializers(serializers.ModelSerializer):
    Medicine_Sales = serializers.DecimalField(decimal_places=2, max_digits=10)
    day = serializers.DateField() 
    class Meta:
        model = BillItem
        fields = ('id','day','Medicine_Sales')
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['day']=instance['day'].strftime("%d/%m/%Y")
        return rep

class MedicinePurchaseSerializers(serializers.ModelSerializer):
    Medicine_Purchase = serializers.DecimalField(decimal_places=2, max_digits=10)
    day = serializers.DateField()    
    class Meta:
        model = StockItem
        fields = ('id','day','Medicine_Purchase')
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['day']=instance['day'].strftime("%d/%m/%Y")
        return rep


class MedicineTypeSerializers(serializers.ModelSerializer):
    amount = serializers.DecimalField(decimal_places=2, max_digits=10)
    type = serializers.CharField()
    class Meta:
        model = BillItem
        fields = ('id','amount','type')

