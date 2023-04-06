from django.db import models
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import User
import datetime
from phonenumber_field.modelfields import PhoneNumberField


class NotDeleted(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)


class SoftDelete(models.Model):
    is_deleted = models.BooleanField(default=False)
    data = models.Manager()
    objects = NotDeleted()

    def soft_delete(self):
        if self.is_deleted == False:
            self.is_deleted = True
            self.medName += ' (deleted)'
            self.save()

    def restore(self):
        if self.is_deleted == True:
            self.is_deleted = False
            self.medName = self.medName.replace(" (deleted)", "")
            self.save()

    # abstract will not create model in database
    class Meta:
        abstract = True


def get_superuser():
    # if you have more than 1 superuser, this get the first in list.
    su_user = User.objects.filter(is_superuser=True).first()
    if su_user:
        return su_user
    # or you can create SU here
    raise ObjectDoesNotExist('Please add Super User')


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profilePhoto = models.ImageField(
        blank=True, upload_to='profile/', default='../static/images/User-Icon.jpg')
    mobileNo = PhoneNumberField(
        blank=True, null=True, unique=True, help_text="Enter number with country code like +91")
    role = models.CharField(max_length=15)

    def __str__(self):
        return self.user.username


class MedicalShop(models.Model):
    shopName = models.CharField(max_length=50)
    shopContactNo = PhoneNumberField(
        blank=False, null=False, unique=True, help_text="Enter number with country code like +91")
    shopSupervisior = models.ForeignKey(
        User, on_delete=models.SET(get_superuser), related_name='MedicalShops')
    shopAddress = models.TextField(max_length=128, blank=False, null=False)

    def __str__(self):
        return self.shopName


class StaffMember(models.Model):
    staffName = models.CharField(max_length=50)
    mobileNo = PhoneNumberField(blank=False, null=False, unique=True,
                                help_text="Enter number with country code like +91")
    salary = models.IntegerField()
    medShop = models.ForeignKey(
        MedicalShop, on_delete=models.CASCADE, related_name='StaffMembers')

    def __str__(self):
        return self.staffName


class Company(models.Model):
    companyName = models.CharField(max_length=50)
    address = models.TextField()
    contactNumber = PhoneNumberField(
        blank=False, null=False, unique=True, help_text="Enter number with country code like +91")

    def __str__(self):
        return self.companyName


class Medicine(SoftDelete):
    medName = models.CharField(max_length=100)
    medDes = models.TextField()
    medPrice = models.DecimalField(decimal_places=2, max_digits=10)
    Type_Choices = [
        ("TB", "Tablet"),
        ("CP", "Capsule"),
        ("LQ", "Liquid"),
        ("CR", "Cream"),
        ("PC", "Patche"),
        ("OT", "Other"),
    ]
    medType = models.CharField(
        max_length=2, choices=Type_Choices, default="OT")
    minimumQty = models.IntegerField(default=10)
    medShop = models.ForeignKey(
        MedicalShop, on_delete=models.CASCADE, related_name='Medicines')

    medImage = models.ImageField(blank=True, upload_to='medicineImages/',
                                 default='../static/images/defMedImage.jpg')
    medCompany = models.ForeignKey(Company, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.medName

    def checkQuantity(self):
        stocks = self.Stocks.filter(
            expiryDate__gte=datetime.date.today()).order_by()
        quantity = 0
        for st in stocks:
            quantity += int(st.currentQuantity)
        return quantity

    def addQuantity(self, quantity):
        stocks = self.Stocks.filter(
            expiryDate__gte=datetime.date.today()).order_by()
        for st in stocks:
            if quantity:
                if quantity <= (st.orderedQuantity-st.currentQuantity):
                    st.currentQuantity += quantity
                    quantity = 0
                    st.save()
                    break
                else:
                    quantity -= (st.orderedQuantity-st.currentQuantity)
                    st.currentQuantity = st.orderedQuantity
                    st.save()
            else:
                break

    def removeQuantity(self, quantity):
        stocks = self.Stocks.filter(
            expiryDate__gte=datetime.date.today()).order_by('arrivalDate')
        count = 0
        for st in stocks:
            if quantity:
                if quantity <= st.currentQuantity:
                    st.currentQuantity -= quantity
                    quantity = 0
                    st.save()
                    break
                else:
                    quantity -= st.currentQuantity
                    st.currentQuantity = 0
                    st.save()
            else:
                break


class StockItem(models.Model):
    medName = models.ForeignKey(
        Medicine, on_delete=models.SET_NULL, blank=False, null=True, related_name='Stocks')
    companyName = models.ForeignKey(
        Company, on_delete=models.SET_NULL, blank=False, null=True, related_name="Stocks")
    orderedQuantity = models.IntegerField()
    currentQuantity = models.IntegerField()
    price = models.DecimalField(decimal_places=2, max_digits=10)
    arrivalDate = models.DateTimeField(default=datetime.datetime.now)
    expiryDate = models.DateField(default=datetime.date.today)

    def __str__(self):
        return str(self.id)


class Bill(models.Model):
    billId = models.AutoField(primary_key=True)
    generatedDate = models.DateTimeField(default=datetime.datetime.now)
    medShop = models.ForeignKey(
        MedicalShop, on_delete=models.CASCADE, related_name="Bills")
    totalAmount = models.DecimalField(
        decimal_places=2, max_digits=10, default=0.00)

    def __str__(self):
        return str(self.billId)

    def setTotalAmont(self):
        billitems = self.BillItems.all()
        amount = 0.00
        for item in billitems:
            amount += (item.quantity*item.price)
        self.totalAmount = amount
        self.save()


class BillItem(models.Model):
    medName = models.ForeignKey(
        Medicine, blank=False, null=True, on_delete=models.SET_NULL, related_name="Bills")
    quantity = models.IntegerField()
    price = models.DecimalField(decimal_places=2, max_digits=10)
    relatedbill = models.ForeignKey(
        Bill,  on_delete=models.CASCADE, related_name="BillItems")

    def __str__(self):
        return str(self.id)
