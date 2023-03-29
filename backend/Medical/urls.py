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



from django.conf import settings
from django.conf.urls.static import static

from django.contrib import admin
from django.urls import include, path
from .views import MedicalShopRUD,MedicalShopC,MedicineC,MedicineRUD,staffMemberC,staffMemberRUD,companyC,companyRUD,billC,billRUD,billItemRUD,billItemC,stockC,stockRUD,stockItemC,stockItemRUD,ProfileC,ProfileRUD    
urlpatterns = [
    path('ms/',MedicalShopC.as_view(),name="medicalShop.create"),
    path('ms/<int:pk>',MedicalShopRUD.as_view(),name="medicalShop.RUD"),

    path('med/',MedicineC.as_view(),name="medicine.create"),
    path('med/<int:pk>',MedicineRUD.as_view(),name="medicine.RUD"),

    path('sfm/',staffMemberC.as_view(),name="sfm.create"),
    path('sfm/<int:pk>',staffMemberRUD.as_view(),name="sfm.RUD"),

    path('com/',companyC.as_view(),name="com.create"),
    path('com/<int:pk>',companyRUD.as_view(),name="com.RUD"),

    path('bill/',billC.as_view(),name="bill.create"),
    path('bill/<int:pk>',billRUD.as_view(),name="bill.RUD"),

    path('billItem/',billItemC.as_view(),name="billItem.create"),
    path('billItem/<int:pk>',billItemRUD.as_view(),name="billItem.RUD"),

    path('stock/',stockC.as_view(),name="stock.create"),
    path('stock/<int:pk>',stockRUD.as_view(),name="stock.RUD"),

    path('stockItem/',stockItemC.as_view(),name="stockItem.create"),
    path('stockItem/<int:pk>',stockItemRUD.as_view(),name="stockItem.RUD"),

    path('profile/',ProfileC.as_view(),name="profile.create"),
    path('profile/<int:pk>',ProfileRUD.as_view(),name="profile.RUD"),
]

if settings.DEBUG:
        urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT) 