from django.urls import path
from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register('games', views.GameViewSet, basename='games')
router.register('genres', views.GenreViewSet, basename='genres')

urlpatterns = router.urls