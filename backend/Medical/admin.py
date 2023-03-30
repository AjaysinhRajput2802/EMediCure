from django.contrib import admin
from . import models
# Register your models here.


class MedicalShopAdmin(admin.ModelAdmin):
    pass


admin.site.register(models.MedicalShop, MedicalShopAdmin)


class MedicineAdmin(admin.ModelAdmin):
    pass


admin.site.register(models.Medicine, MedicalShopAdmin)


class CompanyAdmin(admin.ModelAdmin):
    pass


admin.site.register(models.Company, CompanyAdmin)


class StockAdmin(admin.ModelAdmin):
    pass


admin.site.register(models.Stock, StockAdmin)


class StockItemAdmin(admin.ModelAdmin):
    pass


admin.site.register(models.StockItem, StockItemAdmin)


class BillAdmin(admin.ModelAdmin):
    pass


admin.site.register(models.Bill, BillAdmin)


class BillItemAdmin(admin.ModelAdmin):
    pass


admin.site.register(models.BillItem, BillAdmin)


class StaffMemberAdmin(admin.ModelAdmin):
    pass


admin.site.register(models.StaffMember, StaffMemberAdmin)


class ProfileAdmin(admin.ModelAdmin):
    pass


admin.site.register(models.Profile, ProfileAdmin)
