from .common import *
from decouple import config, Csv
from datetime import timedelta

DEBUG = False

SECRET_KEY = config('SECRET_KEY')

SIMPLE_JWT = {
    'AUTH_HEADER_TYPES' : ('JWT',),
    'ACCESS_TOKEN_LIFETIME' : timedelta(minutes=15),
}

ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=Csv())

# Optimized static file serving for WhiteNoise
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Security settings
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

