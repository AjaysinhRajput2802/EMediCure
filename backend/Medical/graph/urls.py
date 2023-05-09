"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""


from django.urls import path
from.views import SalesView,PurchaseView,MedicinePurchaseView,MedicineSalesView,MedicineTypeSales
urlpatterns = [
    path('sales/<int:shopId>/',SalesView.as_view(),name="sales"),
    path('purchase/<int:shopId>/',PurchaseView.as_view(),name="purchase"),
    path('medSales/<int:medName>/',MedicineSalesView.as_view(),name="medicine.sales"),
    path('medPurchase/<int:medName>/',MedicinePurchaseView.as_view(),name="medicine.purchase"),
    path('medTypeSales/<int:shopId>/',MedicineTypeSales.as_view(),name="medType.sales"),
]