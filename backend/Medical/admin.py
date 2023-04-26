from django.contrib import admin
from . import models
# Register your models here.
from rest_framework_simplejwt.token_blacklist.admin import OutstandingTokenAdmin    
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken

class MedicalShopAdmin(admin.ModelAdmin):
    model = models.MedicalShop
    list_display = ('id','shopName', 'shopContactNo','shopOwner',
                    'shopSupervisor', 'shopAddress')


admin.site.register(models.MedicalShop, MedicalShopAdmin)


class MedicineAdmin(admin.ModelAdmin):
    model = models.Medicine
    list_display = ('id','is_deleted', 'medName', 'medPrice', 'medType',
                    'minimumQty', 'medShop', 'medCompany', 'medImage')


admin.site.register(models.Medicine, MedicineAdmin)


class CompanyAdmin(admin.ModelAdmin):
    model = models.Company
    list_display = ('id','companyName', 'address', 'contactNumber')


admin.site.register(models.Company, CompanyAdmin)


class StockItemAdmin(admin.ModelAdmin):
    model = models.StockItem
    list_display = ('id','medName', 'orderedQuantity',
                    'currentQuantity', 'price', 'arrivalDate', 'companyName', 'expiryDate')


admin.site.register(models.StockItem, StockItemAdmin)


class BillAdmin(admin.ModelAdmin):
    model = models.Bill
    list_display = ('billId', 'generatedDate', 'medShop', 'totalAmount')


admin.site.register(models.Bill, BillAdmin)


class BillItemAdmin(admin.ModelAdmin):
    model = models.BillItem
    list_display = ('id','medName', 'quantity', 'price', 'relatedbill')


admin.site.register(models.BillItem, BillItemAdmin)


class StaffMemberAdmin(admin.ModelAdmin):
    model = models.StaffMember
    list_display = ('id','staffName', 'mobileNo', 'salary', 'medShop')


admin.site.register(models.StaffMember, StaffMemberAdmin)


class ProfileAdmin(admin.ModelAdmin):
    model = models.Profile
    list_display = ('id','user', 'profilePhoto', 'mobileNo', 'role')


admin.site.register(models.Profile, ProfileAdmin)



class OutstandingTokenAdmin(admin.ModelAdmin):
    model = OutstandingToken
    list_display=( 
        "jti",
        "user",
        "created_at",
        "expires_at",)
    
admin.site.unregister(OutstandingToken)
admin.site.register(OutstandingToken, OutstandingTokenAdmin)