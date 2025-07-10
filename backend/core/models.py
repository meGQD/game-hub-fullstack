from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    first_name = models.CharField(max_length=255) # making first_name a required field
    email = models.EmailField(unique=True) # making email a unique field