from rest_framework.decorators import action
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from .models import Profile, FavoriteGame
from .serializers import ProfileSerializer, AddFavoriteGameSerializer, FavoriteGameSerializer
from api.models import Game

class ProfileViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAdminUser]

    @action(detail=False, methods=['GET', 'PUT'], permission_classes=[IsAuthenticated])
    def me(self, request): 
        (profile, created) = Profile.objects.get_or_create(user_id= request.user.id)
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

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AddFavoriteGameSerializer
        return FavoriteGameSerializer
    
    def get_serializer_context(self):
        return {'profile_id': self.kwargs['profile_pk']}
    
    def get_queryset(self):
        return FavoriteGame.objects.filter(profile_id=self.kwargs['profile_pk']).select_related('game')