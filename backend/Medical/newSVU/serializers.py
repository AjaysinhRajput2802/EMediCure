from rest_framework import serializers
from Medical.models import *

class StockCRUDS(serializers.ModelSerializer):

    class Meta:
        model = StockItem
        fields = ('id','medName','orderedQuantity','currentQuantity','companyName','price','arrivalDate','expiryDate')
        extra_kwargs = {
            'companyName': {'read_only': True},
            # 'price': {'read_only': True},
            'currentQuantity':{'read_only': True}
        }

    def create(self, validated_data):
        medObj = Medicine.objects.get(id=validated_data['medName'].id)
        validated_data['currentQuantity'] = validated_data['orderedQuantity']
        validated_data['companyName'] = medObj.medCompany
        # validated_data['price'] = medObj.medPrice
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if instance.medName != validated_data['medName']:
            medObj = Medicine.objects.get(id=validated_data['medName'].id)
            validated_data['companyName'] = medObj.medCompany
            # validated_data['price'] = medObj.medPrice
            validated_data['currentQuantity'] = validated_data['orderedQuantity']
        return super().update(instance,validated_data)
    
class BillItemCS(serializers.ModelSerializer):
    class Meta:
        model = BillItem
        fields = ('id','medName','quantity','price')
        extra_kwargs = {
          'price': {'read_only': True},
          
        }
        depth =0

    def validate(self, attrs):
        medName = attrs['medName']
        if (attrs['quantity'] > medName.checkQuantity()):
            error = str(medName.medName) +  ' : Avalilable stock is lower than requested'
            raise serializers.ValidationError(error)
        return super().validate(attrs)

    def create(self, validated_data):
        medName = validated_data.get('medName', None)
        quantity = validated_data.get('quantity', None)
        medName.removeQuantity(quantity)
        validated_data['price'] = medName.medPrice
        return super().create(validated_data)

    def update(self, instance, validated_data):
        newMedName = validated_data.get('medName', None)
        newQuantity = validated_data.get('quantity', None)
        oldMedName = instance.medName
        oldQuantity = instance.quantity
        oldMedName.addQuantity(oldQuantity)
        newMedName.removeQuantity(newQuantity)
        if oldMedName != newMedName:
            validated_data['price'] = newMedName.medPrice
        return super().update(instance, validated_data)



class BillItemSerializers(serializers.ModelSerializer):
    class Meta:
        model = BillItem
        fields = ['id','medName','price','quantity','relatedbill']
        extra_kwargs = {
          'price': {'read_only': True},  
          'relatedbill': {'read_only': True}
        }


 

class BillSerilizers(serializers.ModelSerializer):
    BillItems = BillItemCS(many=True)
    class Meta:
        model = Bill
        fields = ['pk','medShop','totalAmount','BillItems','generatedDate']
        extra_kwargs = {
          'totalAmount': {'read_only': True},  
          'generatedDate':{'read_only':True}
        } 
        

    def create(self, validated_data):

        billitems = validated_data.pop('BillItems')
        validated_data['generatedDate'] = datetime.datetime.today()
        bill_instance = Bill.objects.create(**validated_data)
    
        for item in billitems:
           
            item['price'] = item['medName'].medPrice
            item_instance=BillItem.objects.create(relatedbill = bill_instance,**item)
            item_instance.medName.removeQuantity(item_instance.quantity)
           

        return bill_instance
        

    
