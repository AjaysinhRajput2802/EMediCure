# Generated by Django 4.1.7 on 2023-04-20 11:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Medical', '0009_alter_medicine_medtype'),
    ]

    operations = [
        migrations.AddField(
            model_name='bill',
            name='custName',
            field=models.CharField(default='temp', max_length=100),
            preserve_default=False,
        ),
    ]