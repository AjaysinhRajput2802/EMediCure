# Generated by Django 4.1.7 on 2023-03-29 11:11

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Medical', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bill',
            name='generatedDate',
            field=models.DateField(default=datetime.date.today),
        ),
        migrations.AlterField(
            model_name='stock',
            name='arrivalDate',
            field=models.DateField(default=datetime.date.today),
        ),
        migrations.AlterField(
            model_name='stockitem',
            name='expiryDate',
            field=models.DateField(default=datetime.date.today),
        ),
    ]
