import json
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response

from .models import Recipe, Media
from .serializers import RecipeSerializer, MediaSerializer


class RecipeViewSet(ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def create(self, request, *args, **kwargs):
        recipe_serializer = self.get_serializer(data=request.data)
        recipe_serializer.is_valid(raise_exception=True)
        recipe = recipe_serializer.save(created_by=request.user)

        headers = self.get_success_headers(recipe_serializer.data)
        return Response(data=recipe_serializer.data, status=200, headers=headers)


class MediaViewSet(ModelViewSet):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        data = {"media": request.data["medias"]}
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        media = serializer.save(recipe=Recipe(pk=request.query_params.get("recipe")))
        headers = self.get_success_headers(serializer.data)
        return Response(data=serializer.data, status=200, headers=headers)
