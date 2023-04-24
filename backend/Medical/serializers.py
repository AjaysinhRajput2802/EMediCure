from rest_framework import serializers
from . import models
import decimal
import datetime


class MedicalShopSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.MedicalShop
        fields = '__all__'


class MedicineSerializers(serializers.ModelSerializer):
    currentQuantity = serializers.SerializerMethodField()

    class Meta:
        model = models.Medicine
        fields = '__all__'
        read_only_fileds = ['currentQuantity',]

    def get_currentQuantity(self, obj):
        return obj.checkQuantity()


class StaffMemberSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.StaffMember
        fields = '__all__'


class CompanySerializers(serializers.ModelSerializer):
    class Meta:
        model = models.Company
        fields = '__all__'


class StockItemSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.StockItem
        fields = '__all__'

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['medName'] = instance.medName.medName
        rep['companyName'] = instance.companyName.companyName
        return rep


# class BillSerializers(serializers.ModelSerializer):
#     class Meta:
#         model = models.Bill
#         fields = '__all__'


# class BillItemSerializers(serializers.ModelSerializer):
#     class Meta:
#         model = models.BillItem
#         fields = '__all__'

#     def validate(self, attrs):
#         medName = attrs['medName']
#         if (attrs['quantity'] > medName.checkQuantity()):
#             raise serializers.ValidationError(
#                 'Avalilable stock is lower than requested')
#         return super().validate(attrs)

#     def create(self, validated_data):

#         medName = validated_data.get('medName', None)
#         quantity = validated_data.get('quantity', None)
#         medName.removeQuantity(quantity)
#         return super().create(validated_data)

#     def update(self, instance, validated_data):
#         newMedName = validated_data.get('medName', None)
#         newQuantity = validated_data.get('quantity', None)
#         oldMedName = instance.medName
#         oldQuantity = instance.quantity
#         oldMedName.addQuantity(oldQuantity)
#         newMedName.removeQuantity(newQuantity)

#         return super().update(instance, validated_data)


class ProfileSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.Profile
        fields = ['id', 'mobileNo', 'profilePhoto', 'role']


class UserSerializers(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)

    class Meta:
        model = models.User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

    def validate_email(self, value):
        user = self.context['request'].user
        if models.User.objects.exclude(pk=user.pk).filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value

    def validate_username(self, value):
        user = self.context['request'].user
        if models.User.objects.exclude(pk=user.pk).filter(username=value).exists():
            raise serializers.ValidationError(
                "This username is already in use.")
        return value

    def update(self, instance, validated_data):
        instance.first_name = validated_data['first_name']
        instance.last_name = validated_data['last_name']
        instance.email = validated_data['email']
        instance.username = validated_data['username']

        instance.save()

        return instance


class BillItemSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.BillItem
        fields = ['id', 'medName', 'quantity', 'price']
        extra_kwargs = {
            'price': {'read_only': True},
            'id': {'read_only': False, 'required': False}
        }

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['medName'] = instance.medName.medName
        return rep


class BillSerilizers(serializers.ModelSerializer):
    BillItems = BillItemSerializers(many=True)

    class Meta:
        model = models.Bill
        fields = ['pk', 'custName', 'medShop',
                  'totalAmount', 'BillItems', 'generatedDate']
        extra_kwargs = {
            'totalAmount': {'read_only': True},
            'generatedDate': {'read_only': True},
        }

    def validate(self, attrs):
        billitems = attrs['BillItems']
        errors = []
        counter = 0
        for item in billitems:
            medName = item['medName']
            if (int(item['quantity']) > medName.checkQuantity()):
                errors.append({str(counter): 'Avaiable Quantity of Medicine Name: ' +
                              str(item['medName']) + ' is lesser than requested'})
            counter = counter+1
        if errors:
            raise serializers.ValidationError({'Outofstock_error': errors})
        return super().validate(attrs)

    def create(self, validated_data):

        billitems = validated_data.pop('BillItems')
        validated_data['generatedDate'] = datetime.datetime.today()
        bill_instance = models.Bill.objects.create(**validated_data)
        amount = decimal.Decimal('0.0')
        for item in billitems:

            item['price'] = item['medName'].medPrice
            item_instance = models.BillItem.objects.create(
                relatedbill=bill_instance, **item)
            item_instance.medName.removeQuantity(item_instance.quantity)
            amount = amount + \
                decimal.Decimal(item_instance.price*item_instance.quantity)

        bill_instance.totalAmount = amount
        bill_instance.save()
        return bill_instance

    def update(self, instance, validated_data):

        billitems = validated_data.get('BillItems', '')
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
                if oldmedName != newmedName:
                    oldmedName.addQuantity(oldquantity)
                    newmedName.removeQuantity(newquantity)
                else:
                    if (oldquantity > newquantity):
                        oldmedName.addQuantity(oldquantity-newquantity)
                    else:
                        oldmedName.removeQuantity(newquantity-oldquantity)
                list_id.append(item['id'])
                amount = amount + newmedName.medPrice*billitem.quantity
                billitem.save()
            else:

                medName = models.Medicine.objects.get(medName=item['medName'])
                item['price'] = medName.medPrice

                billitem_instance = models.BillItem.objects.create(
                    relatedbill=instance, **item)
                item['medName'].removeQuantity(item['quantity'])

                list_id.append(billitem_instance.id)
                amount = amount + \
                    decimal.Decimal(billitem_instance.price *
                                    billitem_instance.quantity)
                billitem_instance.save()

        for item in instance.BillItems.all():
            if item.id not in list_id:
                item.medName.addQuantity(item.quantity)
                item.delete()

        instance.totalAmount = amount

        instance.save()

        return instance
