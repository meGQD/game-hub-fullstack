from django.urls import path
from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register('games', views.GameViewSet, basename='games')
router.register('genres', views.GenreViewSet, basename='genres'),
router.register('platforms', views.PlatformViewSet, basename='platforms')

games_router = routers.NestedDefaultRouter(router, 'games', lookup='game')
games_router.register('screenshots', views.GameScreenshotViewSet, basename='game-screenshots')

urlpatterns = router.urls + games_router.urls