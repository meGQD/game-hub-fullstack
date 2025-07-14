from django.db.models.aggregates import Count
from django_filters.rest_framework import DjangoFilterBackend
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_headers
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.filters import OrderingFilter, SearchFilter
from .models import Game, Genre, Platform, GameScreenshot
from .serializers import GameSerializer, GenreSerializer, PlatformSerializer, GameScreenshotSerializer

@method_decorator(name='dispatch', decorator=vary_on_headers('Accept'))    
@method_decorator(name='dispatch', decorator=cache_page(60 * 30))
class GameViewSet(ReadOnlyModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    lookup_field = 'slug'

    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]

    search_fields = ['name']

    ordering_fields = ['name', 'released', 'added', 'rating', 'metacritic']

    filterset_fields = ['genres', 'parent_platforms']

@method_decorator(name='dispatch', decorator=vary_on_headers('Accept'))    
@method_decorator(name='dispatch', decorator=cache_page(60 * 30))
class GameScreenshotViewSet(ReadOnlyModelViewSet):
    serializer_class = GameScreenshotSerializer

    def get_queryset(self):
        return GameScreenshot.objects.filter(game_id=self.kwargs['game_pk'])

@method_decorator(name='dispatch', decorator=vary_on_headers('Accept'))    
@method_decorator(name='dispatch', decorator=cache_page(60 * 60 * 24))
class GenreViewSet(ReadOnlyModelViewSet):
    queryset = Genre.objects.annotate(games_count=Count('games')).all()
    serializer_class = GenreSerializer

@method_decorator(name='dispatch', decorator=vary_on_headers('Accept'))    
@method_decorator(name='dispatch', decorator=cache_page(60 * 60 * 24 * 30))
class PlatformViewSet(ReadOnlyModelViewSet):
    queryset = Platform.objects.all()
    serializer_class = PlatformSerializer