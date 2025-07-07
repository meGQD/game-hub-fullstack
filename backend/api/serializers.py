from rest_framework import serializers
from .models import Genre, Game, Platform

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name', 'image_background', 'games_count']

    games_count = serializers.IntegerField(read_only=True)

class PlatformSerializer(serializers.ModelSerializer):
    class Meta : 
        model = Platform
        fields = ['id', 'name', 'slug']

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = [  'id',
                    'name',
                    'released',
                    'added',
                    'rating',
                    'rating_top',
                    'metacritic',
                    'background_image', 
                    'genres', 
                    'parent_platforms'
                ]

    parent_platforms = PlatformSerializer(many=True, read_only=True)
    genres = GenreSerializer(many=True, read_only=True)
