from django.core.mail import EmailMessage
from backend.settings import EMAIL_HOST_USER
import threading


class EmailThread(threading.Thread):

    def __init__(self, email):
        self.email = email
        threading.Thread.__init__(self)

    def run(self):
        self.email.send()


class Util:
    @staticmethod
    def send_email(data):
        email = EmailMessage(
            subject=data['email_subject'], 
            body=data['email_body'], 
            from_email=EMAIL_HOST_USER,
            to=[data['to_email']]
            )
        EmailThread(email).start()