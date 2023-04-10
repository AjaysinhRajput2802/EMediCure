from django.contrib import admin
from . import models
# Register your models here.

class MedicalShopAdmin(admin.ModelAdmin):
    model = models.MedicalShop
    list_display = ('shopName', 'shopContactNo',
                    'shopSupervisior', 'shopAddress')


admin.site.register(models.MedicalShop, MedicalShopAdmin)


class MedicineAdmin(admin.ModelAdmin):
    model = models.Medicine
    list_display = ('is_deleted', 'medName', 'medPrice', 'medType',
                    'minimumQty', 'medShop', 'medCompany', 'medImage')


admin.site.register(models.Medicine, MedicineAdmin)


class CompanyAdmin(admin.ModelAdmin):
    model = models.Company
    list_display = ('companyName', 'address', 'contactNumber')


admin.site.register(models.Company, CompanyAdmin)


class StockItemAdmin(admin.ModelAdmin):
    model = models.StockItem
    list_display = ('medName', 'orderedQuantity',
                    'currentQuantity', 'price', 'arrivalDate', 'companyName', 'expiryDate')


admin.site.register(models.StockItem, StockItemAdmin)


class BillAdmin(admin.ModelAdmin):
    model = models.Bill
    list_display = ('billId', 'generatedDate', 'medShop', 'totalAmount')


admin.site.register(models.Bill, BillAdmin)


class BillItemAdmin(admin.ModelAdmin):
    model = models.BillItem
    list_display = ('medName', 'quantity', 'price', 'relatedbill')


admin.site.register(models.BillItem, BillItemAdmin)


class StaffMemberAdmin(admin.ModelAdmin):
    model = models.StaffMember
    list_display = ('staffName', 'mobileNo', 'salary', 'medShop')


admin.site.register(models.StaffMember, StaffMemberAdmin)


class ProfileAdmin(admin.ModelAdmin):
    model = models.Profile
    list_display = ('user', 'profilePhoto', 'mobileNo')


admin.site.register(models.Profile, ProfileAdmin)
