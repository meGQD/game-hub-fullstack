from django.conf import settings
from django.db import models
from api.models import Game

class Profile(models.Model):
    phone = models.CharField(max_length=255, null=True, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'
    
class FavoriteGame(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='favorite_games')
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='+')