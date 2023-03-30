from django.contrib import admin
from . import models
# Register your models here.

class medicalShopAdmin(admin.ModelAdmin):
    pass    


class medicineAdmin(admin.ModelAdmin):
    pass 


class companyAdmin(admin.ModelAdmin):
    pass 

admin.site.register(models.company,companyAdmin)

class stockAdmin(admin.ModelAdmin):
    pass 

admin.site.register(models.stock,stockAdmin)

class stockItemAdmin(admin.ModelAdmin):
    pass 

admin.site.register(models.stockItem,stockItemAdmin)

class billAdmin(admin.ModelAdmin):
    pass 

admin.site.register(models.bill,billAdmin)

class billItemAdmin(admin.ModelAdmin):
    pass 

admin.site.register(models.billItem,billAdmin)

class staffMemberAdmin(admin.ModelAdmin):
    pass 

admin.site.register(models.staffMember,staffMemberAdmin)

class ProfileAdmin(admin.ModelAdmin):
    pass 

admin.site.register(models.Profile,ProfileAdmin)
