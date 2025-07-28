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