from rest_framework.decorators import action
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from .models import Profile, FavoriteGame
from .serializers import ProfileSerializer, AddFavoriteGameSerializer, FavoriteGameSerializer
from api.models import Game

class ProfileViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, GenericViewSet):
    queryset = Profile.objects.select_related('user')\
        .prefetch_related(
            'favorite_games__game__genres',
            'favorite_games__game__screenshots',
            'favorite_games__game__parent_platforms'
        ).all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAdminUser]

    @action(detail=False, methods=['GET', 'PUT'], permission_classes=[IsAuthenticated])
    def me(self, request): 
        (profile, created) = self.get_queryset().get_or_create(user_id= request.user.id)
        if request.method == 'GET':
            serializer = ProfileSerializer(profile)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = ProfileSerializer(profile, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

class FavoriteGamesViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'delete']

    permission_classes = [IsAuthenticated]

    lookup_field = 'game__slug'

    def get_queryset(self):
        profile_id = self._get_profile_id()
        return FavoriteGame.objects.filter(profile_id=profile_id)\
            .select_related('game')\
            .prefetch_related('game__genres', 'game__screenshots', 'game__parent_platforms')

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AddFavoriteGameSerializer
        return FavoriteGameSerializer
    
    def get_serializer_context(self):
        profile_id = self._get_profile_id()
        return {'profile_id': profile_id}
        
    def _get_profile_id(self):
        # Check if we have cached profile_id already 
        if hasattr(self, '_cached_profile_id'):
            return self._cached_profile_id

        # If not cached
        if(self.kwargs['profile_pk'] == 'me'):
            profile_id =  Profile.objects.only('id').get(user_id=self.request.user.id).id
        else:
            profile_id = self.kwargs['profile_pk']

        # Cache the profile_id       
        self._cached_profile_id = profile_id

        return profile_id