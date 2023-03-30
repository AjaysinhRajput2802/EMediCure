from rest_framework import serializers
from . import models

class medicalShopSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.medicalShop
        fields = '__all__'

class medicineSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.medicine
        fields = '__all__'

class staffMemberSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.staffMember
        fields = '__all__'

class companySerializers(serializers.ModelSerializer):
    class Meta:
        model = models.company
        fields = '__all__'

class stockSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.stock
        fields = '__all__'

class stockItemSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.stockItem
        fields = '__all__'

class billSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.bill
        fields = '__all__'

class billItemSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.billItem
        fields = '__all__'

class ProfileSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.Profile
        fields = '__all__'
