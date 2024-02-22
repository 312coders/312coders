from .base import *

# https://simpleisbetterthancomplex.com/tips/2017/07/03/django-tip-20-working-with-multiple-settings-modules.html

DEBUG = True

# ALLOWED_HOSTS = [
#     'localhost',
#     '127.0.0.1',
# ]

# CSRF_TRUSTED_ORIGINS = [
#     'http://localhost',
#     'http://127.0.0.1',
# ]
CORS_ALLOW_ALL_ORIGINS=True

SECRET_KEY = 'django-insecure-e)^p(t($d=sod=wup4&wfpt33fi9ca@kh2$rtfu825-zbl0vv_'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}