# Generated by Django 4.1.7 on 2023-03-30 04:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Medical', '0007_alter_profile_profilephoto'),
    ]

    operations = [
        migrations.AddField(
            model_name='medicine',
            name='medImage',
            field=models.ImageField(blank=True, default='../static/Images/defulatMedicineImage.jifif', null=True, upload_to='medicineImages/'),
        ),
    ]
