# Generated by Django 4.1.7 on 2023-04-17 14:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Medical', '0008_alter_medicalshop_shopsupervisor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medicine',
            name='medType',
            field=models.CharField(choices=[('Tablet', 'Tablet'), ('Capsule', 'Capsule'), ('Liquid', 'Liquid'), ('Cream', 'Cream'), ('Patche', 'Patche'), ('Other', 'Other')], default='Other', max_length=7),
        ),
    ]
