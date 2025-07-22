from rest_framework import serializers
from .models import Profile, FavoriteGame
from api.models import Game
from api.serializers import GameSerializer

class FavoriteGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteGame
        fields = ['id', 'game']

    game = GameSerializer(read_only=True)

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'first_name', 'last_name', 'email', 'phone', 'birth_date', 'favorite_games']

    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name', allow_blank=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    favorite_games = FavoriteGameSerializer(many=True, read_only=True)

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})

        user = instance.user
        user.first_name = user_data.get('first_name', user.first_name)
        user.last_name = user_data.get('last_name', user.last_name)
        user.save()

        return super().update(instance, validated_data)
    
class AddFavoriteGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteGame
        fields = ['id', 'game_id']

    game_id = serializers.IntegerField()

    def validate_game_id(self, value):
        if not Game.objects.filter(pk=value).exists():
            raise serializers.ValidationError('No game with the given ID was found')
        return value

    def save(self, **kwargs):
        profile_id = self.context['profile_id']
        game_id = self.validated_data['game_id']

        (favorite_game, created) = FavoriteGame.objects.get_or_create(game_id=game_id, profile_id=profile_id)

        self.instance = favorite_game
        return self.instance
