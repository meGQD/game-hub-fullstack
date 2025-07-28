from .common import *
from datetime import timedelta

DEBUG = True

SECRET_KEY = 'django-insecure-(r!fp(+q)(6g73ep5o$qu_30zq_772ye$hr89m)nmjvfl$3(y9'

SIMPLE_JWT = {
    'AUTH_HEADER_TYPES' : ('JWT',),
    'ACCESS_TOKEN_LIFETIME' : timedelta(days=30),
}

# django-debug-toolbar settings
INSTALLED_APPS += ['debug_toolbar']
MIDDLEWARE.insert(1, 'debug_toolbar.middleware.DebugToolbarMiddleware')
INTERNAL_IPS = [
    '127.0.0.1'
]