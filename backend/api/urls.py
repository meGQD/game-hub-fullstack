from django.urls import path
from . import views

urlpatterns = [
    path('games', views.get_games, name='get_games'),
    path('genres', views.get_genres, name='get_genres'),
]