from django.db import models
from django.contrib.auth.models import User
import datetime
from phonenumber_field.modelfields import PhoneNumberField
# Create your models here.


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profilePhoto = models.ImageField(
        blank=True, null=True, upload_to='profile/', default='../static/images/User-Icon.jpg')
    mobileNo = PhoneNumberField(blank=True, null=True, unique=True)


class MedicalShop(models.Model):
    shopName = models.CharField(max_length=50)
    shopTelephoneNo = PhoneNumberField(blank=False, null=False, unique=True)
    shopSupervisior = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='MedicalShops')
    shopAddress = models.TextField(max_length=128,blank=False,null=False)

    def __str__(self):
        return self.shopName


class StaffMember(models.Model):
    staffName = models.CharField(max_length=50)
    mobileNo = PhoneNumberField(blank=False, null=False, unique=True)
    salary = models.IntegerField()
    relatedShop = models.ForeignKey(
        MedicalShop, on_delete=models.CASCADE, related_name='StaffMembers')

    def __str__(self):
        return self.staffName



class Company(models.Model):
    companyName = models.CharField(max_length=50)
    description = models.TextField()
    contactNumber = PhoneNumberField(blank=False, null=False, unique=True)

    def __str__(self):
        return self.companyName


class Medicine(models.Model):
    medName = models.CharField(max_length=100)
    medDes = models.TextField()
    medPrice = models.DecimalField(decimal_places=2,max_digits=5)
    Type_Choices = [
        ("TB", "Tablet"),
        ("CP", "Capsule"),
        ("LQ", "Liquid"),
        ("CR", "Cream"),
        ("PC", "Patche"),
        ("OT", "Other"),
    ]
    medType = models.CharField(max_length=2,choices=Type_Choices,default="OT")
    minimumQty = models.IntegerField(default=10)
    medShop = models.ForeignKey(medicalShop,on_delete=models.CASCADE,related_name='Medicines')
    medCompany = models.ForeignKey(company,on_delete=models.DO_NOTHING)
    medImage = models.ImageField(blank=True, null=True, upload_to='medicineImages/',
                                 default='../static/images/defMedImage.jpg')

    def __str__(self):
        return self.medName


class Stock(models.Model):
    batchId = models.AutoField(primary_key=True, unique=True)
    arrivalDate = models.DateTimeField(default=datetime.datetime.now)
    medShop = models.ForeignKey(
        MedicalShop, on_delete=models.CASCADE, related_name='Stock')
    medCompany = models.ForeignKey(
        Company, on_delete=models.DO_NOTHING, related_name="Stock")

    def __str__(self):
        return str(self.batchId)


class StockItem(models.Model):
    batchId = models.ForeignKey(
        Stock, on_delete=models.CASCADE, related_name='StockItems')
    medName = models.ForeignKey(
        Medicine, on_delete=models.SET_NULL, blank=False, null=True, related_name='StockItems')
    quantity = models.IntegerField()
    price = models.DecimalField(decimal_places=2, max_digits=5)
    expiryDate = models.DateField(default=datetime.date.today)

    def __str__(self):
        return str(self.id)


class Bill(models.Model):
    billId = models.AutoField(primary_key=True)
    generatedDate = models.DateTimeField(default=datetime.datetime.now)
    medShop = models.ForeignKey(
        MedicalShop, on_delete=models.CASCADE, related_name="Bills")
    totalAmount = models.DecimalField(decimal_places=2, max_digits=5)

    def __str__(self):
        return str(self.billId)


class BillItem(models.Model):
    medName = models.ForeignKey(
        Medicine, blank=False, null=True, on_delete=models.SET_NULL, related_name="Bills")
    quantity = models.IntegerField()
    price = models.DecimalField(decimal_places=2, max_digits=5)
    relatedbill = models.ForeignKey(
        Bill,  on_delete=models.CASCADE, related_name="BillItems")

    def __str__(self):
        return str(self.id)
