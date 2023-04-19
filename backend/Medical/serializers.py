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
        medName = attrs['medName']
        if (attrs['quantity'] > medName.checkQuantity()):
            raise serializers.ValidationError(
                'Avalilable stock is lower than requested')
        return super().validate(attrs)

    def create(self, validated_data):

        medName = validated_data.get('medName', None)
        quantity = validated_data.get('quantity', None)
        medName.removeQuantity(quantity)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        newMedName = validated_data.get('medName', None)
        newQuantity = validated_data.get('quantity', None)
        oldMedName = instance.medName
        oldQuantity = instance.quantity
        oldMedName.addQuantity(oldQuantity)
        newMedName.removeQuantity(newQuantity)

        return super().update(instance, validated_data)


class ProfileSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.Profile
        fields = ['id', 'mobileNo', 'profilePhoto', 'role']

class UserSerializers(serializers.ModelSerializer):
    email = serializers.EmailField(required = True)
    class Meta:
        model = models.User
        fields = ['id', 'username', 'email', 'first_name','last_name']

    def validate_email(self, value):
        user = self.context['request'].user
        if models.User.objects.exclude(pk=user.pk).filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value

    def validate_username(self, value):
        user = self.context['request'].user
        if models.User.objects.exclude(pk=user.pk).filter(username=value).exists():
            raise serializers.ValidationError("This username is already in use.")
        return value

    def update(self, instance, validated_data):
        instance.first_name = validated_data['first_name']
        instance.last_name = validated_data['last_name']
        instance.email = validated_data['email']
        instance.username = validated_data['username']

        instance.save()

        return instance