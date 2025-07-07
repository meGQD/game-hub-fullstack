from django.db.models.aggregates import Count
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.filters import OrderingFilter, SearchFilter
from .models import Game, Genre
from .serializers import GameSerializer, GenreSerializer
    
class GameViewSet(ReadOnlyModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]

    search_fields = ['name']

    ordering_fields = ['name', 'released', 'added', 'rating', 'metacritic']

    filterset_fields = ['genres', 'parent_platforms']

class GenreViewSet(ReadOnlyModelViewSet):
    queryset = Genre.objects.annotate(games_count=Count('games')).all()
    serializer_class = GenreSerializer