from .views import *
from django.urls import path


urlpatterns = [
    path('stock',StockCView.as_view(),name="stock.create"),
    path('stock/<int:pk>',StockRUDView.as_view(),name="stock.rud"),

    path('billItem',BillItemCView.as_view(),name="billitem.create"),
    path('billItem/<int:pk>',BillItemRUDView.as_view(),name="billitem.stock.rud"),

    path('bill/',BillView.as_view(),name='bill.create'),
    path('bill/<int:pk>',BillRUDView.as_view(),name='bill.rud'),
    
    
]
