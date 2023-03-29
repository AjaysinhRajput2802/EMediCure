from django.db import models
from django.contrib.auth.models import User
import datetime
from phonenumber_field.modelfields import PhoneNumberField  
# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profilePhoto = models.ImageField(blank=True,null=True,upload_to='profile/',default='../static/images/User-Icon.jpg')
    mobileNo = PhoneNumberField(blank=True,null=True,unique=True)

class medicalShop(models.Model):
    shopName = models.CharField(max_length=50)
    shopTelephoneNo = PhoneNumberField(blank=False,null=False,unique=True)
    shopSupervisior = models.ForeignKey(User,on_delete=models.CASCADE,related_name='MedicalShop')

    def __str__(self):
        return self.shopName

class staffMember(models.Model):
    staffName = models.CharField(max_length=50)
    mobileNo = PhoneNumberField(blank=False,null=False,unique=True)
    salary = models.IntegerField()
    relatedShop = models.ForeignKey(medicalShop,on_delete=models.CASCADE,related_name='staffMember')

    def __str__(self):
        return self.staffName

class company(models.Model):
    companyName = models.CharField(max_length=50)
    description = models.TextField()
    contactNumber = PhoneNumberField(blank=False,null=False,unique=True)
    
    def __str__(self):
        return self.companyName


class medicine(models.Model):
    medName = models.CharField(max_length=100)
    medDes = models.TextField()
    medPrice = models.DecimalField(decimal_places=2,max_digits=5)
    medType = models.CharField(max_length=20)
    minimumQty = models.IntegerField()
    relatedShop = models.ForeignKey(medicalShop,on_delete=models.CASCADE,related_name='medicine')

    def __str__(self):
        return self.medName 

class stock(models.Model):
    batchId = models.AutoField(primary_key=True,unique=True)
    arrivalDate = models.DateField(default=datetime.date.today)
    relatedShop = models.ForeignKey(medicalShop,on_delete=models.CASCADE,related_name='stock')
    relatedCompany = models.ForeignKey(company,on_delete=models.DO_NOTHING)

    def __str__(self):
        return str(self.batchId)
    
    
class stockItem(models.Model):
    batchId = models.ForeignKey(stock,on_delete=models.CASCADE,related_name='stockItems')
    medName = models.ForeignKey(medicine,on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.DecimalField(decimal_places=2,max_digits=5)
    expiryDate = models.DateField(default=datetime.date.today)

    def __str__(self):
        return str(self.id)
    
   

class bill(models.Model):
    billId =  models.AutoField(primary_key=True)
    generatedDate = models.DateField(default=datetime.date.today)
    relatedShop = models.ForeignKey(medicalShop,on_delete=models.CASCADE)
    totalAmount = models.DecimalField(decimal_places=2,max_digits=5)
 
    def __str__(self):
        return str(self.billId)
    

class billItem(models.Model):
    medName = models.ForeignKey(medicine,on_delete=models.DO_NOTHING)
    quantity = models.IntegerField()
    price = models.DecimalField(decimal_places=2,max_digits=5)
    relatedbill = models.ForeignKey(bill,  on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id)

    




