from django.db.models.aggregates import Count
from django_filters.rest_framework import DjangoFilterBackend
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_headers
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.filters import OrderingFilter, SearchFilter
from .models import Game, Genre, Platform, GameScreenshot
from .serializers import GameSerializer, GenreSerializer, PlatformSerializer, GameScreenshotSerializer
from accounts.models import Profile

# @method_decorator(name='dispatch', decorator=vary_on_headers('Accept'))    
# @method_decorator(name='dispatch', decorator=cache_page(60 * 30))
class GameViewSet(ReadOnlyModelViewSet):
    queryset = Game.objects.prefetch_related('genres', 'screenshots', 'parent_platforms').order_by('id')
    serializer_class = GameSerializer

    lookup_field = 'slug'

    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]

    search_fields = ['name']

    ordering_fields = ['name', 'released', 'added', 'rating', 'metacritic']

    filterset_fields = ['genres', 'parent_platforms']

    def list(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            profile, created = Profile.objects.get_or_create(user=request.user)
            profile.api_request_count += 1
            profile.save()
        return super().list(request, *args, **kwargs)

@method_decorator(name='dispatch', decorator=vary_on_headers('Accept'))    
@method_decorator(name='dispatch', decorator=cache_page(60 * 30))
class GameScreenshotViewSet(ReadOnlyModelViewSet):
    serializer_class = GameScreenshotSerializer

    def get_queryset(self):
        return GameScreenshot.objects.select_related('game').filter(game__slug=self.kwargs['game_slug']).order_by('id')

@method_decorator(name='dispatch', decorator=vary_on_headers('Accept'))    
@method_decorator(name='dispatch', decorator=cache_page(60 * 60 * 24))
class GenreViewSet(ReadOnlyModelViewSet):
    queryset = Genre.objects.annotate(games_count=Count('games')).order_by('id')
    serializer_class = GenreSerializer

@method_decorator(name='dispatch', decorator=vary_on_headers('Accept'))    
@method_decorator(name='dispatch', decorator=cache_page(60 * 60 * 24 * 30))
class PlatformViewSet(ReadOnlyModelViewSet):
    queryset = Platform.objects.order_by('id')
    serializer_class = PlatformSerializer