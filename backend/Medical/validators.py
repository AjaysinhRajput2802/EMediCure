from django.core.exceptions import ValidationError


def validate_mobileNO(value):
    if value.length != 10:
        raise ValidationError(
            _('Enter 10 digits')
        )