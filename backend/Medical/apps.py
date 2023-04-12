from django.apps import AppConfig


class MedicalConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Medical'

    # def ready(self):
    #     import Medical.auth.signals 
