from django.urls import path
from . import views

urlpatterns = [
    path('games', views.GameViewSet.as_view({'get': 'list'}), name='get_games'),
    path('genres', views.GenreViewSet.as_view({'get': 'list'}), name='get_genres'),
]