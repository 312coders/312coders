from .base import *

DEBUG = True

SECRET_KEY = 'django-insecure-e)^p(t($d=sod=wup4&wfpt33fi9ca@kh2$rtfu825-zbl0vv_'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}