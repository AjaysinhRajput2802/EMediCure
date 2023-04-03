# from django.db.models.signals import *
# from django.dispatch import receiver
# from .models import *


# @receiver(post_save, sender=StockItem)
# def add_stock(sender, instance, **kwargs):
#     medicine = Medicine.objects.get(instance.medName)
#     medicine.medQuantity += instance.quantity
#     medicine.save()


# @receiver(post_delete, sender=StockItem)
# def delete_stock(sender, instance, **kwargs):
#     medicine = Medicine.objects.get(instance.medName)
#     medicine.medQuantity -= instance.quantity
#     medicine.save()


# @receiver(post_save, sender=BillItem)
# def add_stock(sender, instance, **kwargs):
#     medicine = Medicine.objects.get(instance.medName)
#     medicine.medQuantity -= instance.quantity
#     medicine.save()


# @receiver(post_delete, sender=BillItem)
# def delete_stock(sender, instance, **kwargs):
#     medicine = Medicine.objects.get(instance.medName)
#     medicine.medQuantity += instance.quantity
#     medicine.save()
