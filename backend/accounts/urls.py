from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register('profiles', views.ProfileViewSet, basename='profiles')

profiles_router = routers.NestedDefaultRouter(router, 'profiles', lookup='profile')
profiles_router.register('favorite_games', views.FavoriteGamesViewSet, basename='profile-favorite_games')

urlpatterns = router.urls + profiles_router.urls