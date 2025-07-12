from rest_framework import serializers
from .models import Genre, Game, Platform, GameScreenshot

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name', 'image_background', 'games_count']

    games_count = serializers.IntegerField(read_only=True)

class PlatformSerializer(serializers.ModelSerializer):
    class Meta : 
        model = Platform
        fields = ['id', 'name', 'slug']

class GameScreenshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameScreenshot
        fields = ['id', 'image']

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = [  'id',
                    'name',
                    'slug',
                    'description',
                    'released',
                    'added',
                    'rating',
                    'rating_top',
                    'metacritic',
                    'background_image', 
                    'genres', 
                    'parent_platforms',
                    'screenshots',
                ]

    parent_platforms = PlatformSerializer(many=True, read_only=True)
    genres = GenreSerializer(many=True, read_only=True)
    screenshots = GameScreenshotSerializer(many=True, read_only=True)

    # add slugify field
