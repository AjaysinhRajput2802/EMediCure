# from django.db.models.signals import *
# from django.dispatch import receiver
# from .models import *
# import datetime


# @receiver(post_save, sender=BillItem)
# def quantityupdateOnCreate(sender, instance, created, **kwargs):

#     # print(instance.id, instance.medName, instance.quantity      )
#     stocks = StockItem.objects.filter(medName=instance.medName).filter(
#         expiryDate__gte=datetime.date.today()).order_by('arrivalDate')
#     buyQuantity = instance.quantity
#     if created:
#         for st in stocks:
#             if buyQuantity:
#                 if buyQuantity <= st.currentQuantity:
#                     st.currentQuantity -= buyQuantity
#                     buyQuantity = 0
#                     st.save()
#                     break
#                 else:
#                     buyQuantity -= (buyQuantity-st.currentQuantity)
#                     st.currentQuantity = 0
#                     st.save()
#             else:
#                 break


# @receiver(post_delete, sender=BillItem)
# def quantityUpdateOnDelete(sender, instance, **kwargs):

#     stocks = StockItem.objects.filter(medName=instance.medName).filter(
#         expiryDate__gte=datetime.date.today()).order_by('arrivalDate')
#     buyQuantity = instance.quantity
#     for st in stocks:
#         if buyQuantity:
#             if buyQuantity <= (st.orderedQuantity-st.currentQuantity):
#                 st.currentQuantity += buyQuantity
#                 buyQuantity = 0
#                 st.save()
#                 break
#             else:
#                 buyQuantity -= (st.orderedQuantity-st.currentQuantity)
#                 st.currentQuantity = st.orderedQuantity
#                 st.save()
#         else:
#             break
