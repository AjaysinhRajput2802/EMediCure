from rest_framework import serializers
from Medical.models import *
import decimal
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
        fields = ['id','medName','quantity','price','relatedbill']
        extra_kwargs = {
          'price': {'read_only': True},
        }
        
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
        billInstance = validated_data.get('relatedbill',None)
        billInstance.totalAmount += decimal.Decimal(medName.medPrice*quantity)
        billInstance.save()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        newMedName = validated_data.get('medName', None)
        newQuantity = validated_data.get('quantity', None)
        oldMedName = instance.medName
        oldQuantity = instance.quantity
        oldMedName.addQuantity(oldQuantity)
        newMedName.removeQuantity(newQuantity)
        bill= validated_data.get('relatedbill',None)
        bill.totalAmount -=decimal.Decimal(oldMedName.medPrice*oldQuantity)
        bill.totalAmount +=decimal.Decimal(newMedName.medPrice*newQuantity) 
        bill.save()
        if oldMedName != newMedName:
            validated_data['price'] = newMedName.medPrice
       
        return super().update(instance, validated_data)

class BillItemSerializers(serializers.ModelSerializer):
    class Meta:
        model = BillItem
        fields = ['id','medName','quantity','price']
        extra_kwargs = {
          'price': {'read_only': True},
          'id': {'read_only': False, 'required': False}
        }
     

class BillSerilizers(serializers.ModelSerializer):
    BillItems = BillItemSerializers(many=True)
    class Meta:
        model = Bill
        fields = ['pk','medShop','totalAmount','BillItems','generatedDate']
        extra_kwargs = {
          'totalAmount': {'read_only': True},  
          'generatedDate':{'read_only':True},
        } 
        
    def validate(self, attrs):
        billitems = attrs['BillItems']
        for item in billitems:
            medName = item['medName']
            if (item['quantity'] > medName.checkQuantity()):
                raise serializers.ValidationError({item['medName']:'Avaiable Quantity is lesser than requested'})
        return super().validate(attrs)
    
    def create(self, validated_data):

        billitems = validated_data.pop('BillItems')
        validated_data['generatedDate'] = datetime.datetime.today()
        bill_instance = Bill.objects.create(**validated_data)
        amount = decimal.Decimal('0.0')
        for item in billitems:
           
            item['price'] = item['medName'].medPrice
            item_instance=BillItem.objects.create(relatedbill = bill_instance,**item)
            item_instance.medName.removeQuantity(item_instance.quantity)
            amount = amount + decimal.Decimal(item_instance.price*item_instance.quantity)
           
        bill_instance.totalAmount = amount
        bill_instance.save()
        return bill_instance
    
    def update(self, instance, validated_data):

        billitems = validated_data.get('BillItems','')
        list_id = []
        amount = decimal.Decimal('0.0')
        for item in billitems:
            
            # check for if item present in list 
            if 'id' in item.keys():
                billitem = instance.BillItems.get(id=item['id'])
                oldmedName = billitem.medName
                oldquantity = billitem.quantity
                newmedName = item['medName']
                newquantity = item['quantity']

                billitem.medName = newmedName
                billitem.price = newmedName.medPrice
                billitem.quantity = newquantity

                # check item same or diffrent
                if oldmedName!=newmedName:
                    oldmedName.addQuantity(oldquantity)
                    newmedName.removeQuantity(newquantity)
                else:
                    if(oldquantity > newquantity):
                        oldmedName.addQuantity(oldquantity-newquantity)
                    else:
                        oldmedName.removeQuantity(newquantity-oldquantity)
                list_id.append(item['id'])
                amount = amount + newmedName.medPrice*billitem.quantity
                billitem.save()
            else:
            
                medName = Medicine.objects.get(medName=item['medName'])
                item['price'] = medName.medPrice

                billitem_instance = BillItem.objects.create(relatedbill = instance,**item)
                item['medName'].removeQuantity(item['quantity'])
                
                list_id.append(billitem_instance.id)
                amount = amount + decimal.Decimal(billitem_instance.price*billitem_instance.quantity)
                billitem_instance.save()

        for item in instance.BillItems.all():
            if item.id not in list_id:
                item.medName.addQuantity(item.quantity)
                item.delete()
            
        instance.totalAmount = amount
        
        instance.save()

        return instance

    





        

    
