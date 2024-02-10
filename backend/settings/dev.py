from .base import *
import os
from dotenv import load_dotenv


# https://simpleisbetterthancomplex.com/tips/2017/07/03/django-tip-20-working-with-multiple-settings-modules.html

load_dotenv()

DEBUG = True

SECRET_KEY = 'django-insecure-e)^p(t($d=sod=wup4&wfpt33fi9ca@kh2$rtfu825-zbl0vv_'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('POSTGRES_DEV_DB'),
        'USER': os.getenv('POSTGRES_USER'),
        'PASSWORD': os.getenv('POSTGRES_PASSWORD'),
        'HOST': os.getenv('POSTGRES_HOST'),
        'PORT': os.getenv('POSTGRES_PORT'),
    }
}