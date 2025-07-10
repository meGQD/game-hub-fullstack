from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register('profiles', views.ProfileViewSet, basename='profiles')

urlpatterns = router.urls