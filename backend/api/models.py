from django.db import models

class Genre(models.Model):
    name = models.CharField(max_length=255)
    image_background = models.URLField(max_length=500, null=True, blank=True)

class Platform(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField()

class Game(models.Model):
    name = models.CharField(max_length=255)
    released = models.DateField(null=True, blank=True)
    added = models.DateTimeField(auto_now_add=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2)
    rating_top = models.IntegerField()
    metacritic = models.IntegerField()
    background_image = models.URLField(max_length=500, null=True, blank=True)
    genres = models.ManyToManyField(Genre, related_name='games')
    parent_platforms = models.ManyToManyField(Platform, related_name='games')
