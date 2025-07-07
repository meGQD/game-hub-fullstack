from django.db.models.aggregates import Count
from django_filters.rest_framework import DjangoFilterBackend
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_headers
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.filters import OrderingFilter, SearchFilter
from .models import Game, Genre
from .serializers import GameSerializer, GenreSerializer

@method_decorator(name='dispatch', decorator=vary_on_headers('Accept'))    
@method_decorator(name='dispatch', decorator=cache_page(60 * 30))
class GameViewSet(ReadOnlyModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]

    search_fields = ['name']

    ordering_fields = ['name', 'released', 'added', 'rating', 'metacritic']

    filterset_fields = ['genres', 'parent_platforms']

@method_decorator(name='dispatch', decorator=vary_on_headers('Accept'))    
@method_decorator(name='dispatch', decorator=cache_page(60 * 60 * 24))
class GenreViewSet(ReadOnlyModelViewSet):
    queryset = Genre.objects.annotate(games_count=Count('games')).all()
    serializer_class = GenreSerializer