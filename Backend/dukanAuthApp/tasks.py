from celery import shared_task as task
from django.core.mail import send_mail
from django.conf import settings

@task(name='send_mail',time_limit=25)
def send_mail_celery(to=[],subject=None,message=None):
    send_mail(subject=subject,message=message,recipient_list=to,from_email=settings.EMAIL_HOST_USER)
