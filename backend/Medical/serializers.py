from rest_framework import serializers
from . import models


class MedicalShopSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.MedicalShop
        fields = '__all__'


class MedicineSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.Medicine
        fields = '__all__'


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


class BillSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.Bill
        fields = '__all__'


class BillItemSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.BillItem
        fields = '__all__'

    def validate(self, attrs):
        medQ = models.Medicine.objects.filter(medName=attrs['medName']).first()
        if (attrs['quantity'] > medQ.medQuantity):
            raise serializers.ValidationError(
                ('Availabe stock is %(x)',))
        return attrs


class ProfileSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.Profile
        fields = '__all__'
