# Generated by Django 4.1.7 on 2023-04-29 17:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Medical', '0012_company_medshop'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medicalshop',
            name='shopAddress',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='medicalshop',
            name='shopSupervisor',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='MedicalShops', to=settings.AUTH_USER_MODEL),
        ),
    ]
