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
from . import views

urlpatterns = [
    path('medical/', views.MedicalShopC.as_view(), name="medicalShop.create"),
    path('medical/<int:pk>', views.MedicalShopRUD.as_view(), name="medicalShop.RUD"),

    path('medicine/', views.MedicineC.as_view(), name="medicine.create"),
    path('medicine/<int:pk>', views.MedicineRUD.as_view(), name="medicine.RUD"),

    path('staffMember/', views.StaffMemberC.as_view(), name="sfm.create"),
    path('staffMember/<int:pk>', views.StaffMemberRUD.as_view(), name="sfm.RUD"),

    path('company/', views.CompanyC.as_view(), name="com.create"),
    path('company/<int:pk>', views.CompanyRUD.as_view(), name="com.RUD"),

    path('bill/', views.BillC.as_view(), name="bill.create"),
    path('bill/<int:pk>', views.BillRUD.as_view(), name="bill.RUD"),

    path('billItem/', views.BillItemC.as_view(), name="billItem.create"),
    path('billItem/<int:pk>', views.BillItemRUD.as_view(), name="billItem.RUD"),


    path('stockItem/', views.StockItemC.as_view(), name="stockItem.create"),
    path('stockItem/<int:pk>', views.StockItemRUD.as_view(), name="stockItem.RUD"),

    path('profile/', views.ProfileC.as_view(), name="profile.create"),
    path('profile/<int:pk>', views.ProfileRUD.as_view(), name="profile.RUD"),
]
