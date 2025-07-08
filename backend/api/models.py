from django.db import models

class Genre(models.Model):
    name = models.CharField(max_length=255)
    image_background = models.URLField(max_length=500, null=True, blank=True)

    def __str__(self):
        return self.name

class Platform(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField()

    def __str__(self):
        return self.name

class Game(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    released = models.DateField(null=True, blank=True)
    added = models.DateTimeField(auto_now_add=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    rating_top = models.IntegerField(null=True, blank=True)
    metacritic = models.IntegerField(null=True, blank=True)
    background_image = models.URLField(max_length=500, null=True, blank=True)
    genres = models.ManyToManyField(Genre, related_name='games')
    parent_platforms = models.ManyToManyField(Platform, related_name='games')

    def __str__(self):
        return self.name
