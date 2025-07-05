from django.db import models

class Genre(models.Model):
    name = models.CharField(max_length=255)
    image_background = models.URLField(max_length=500, null=True, blank=True)

class Platform(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField()

class Game(models.Model):
    name = models.CharField(max_length=255)
    metacritic = models.IntegerField()
    rating_top = models.IntegerField()
    background_image = models.URLField(max_length=500, null=True, blank=True)
    genre = models.ManyToManyField(Genre, related_name='games')
    parent_platforms = models.ManyToManyField(Platform, related_name='games')
