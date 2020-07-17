import json
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from .models import Recipe
from .serializers import RecipeSerializer


class RecipeViewSet(ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def create(self, request, *args, **kwargs):
        req = {
            "name": request.data["name"],
            "description": request.data["description"],
            "difficulty": request.data["difficulty"],
            "medias": [{"media": request.data["medias"]}],
            "steps": json.loads(request.data["steps"]),
            "groups": json.loads(request.data["groups"]),
        }
        recipe_serializer = self.get_serializer(data=req)

        if recipe_serializer.is_valid(raise_exception=True):
            recipe = recipe_serializer.save(created_by=request.user)

        headers = self.get_success_headers(recipe_serializer.data)
        return Response(data=recipe_serializer.data, status=200, headers=headers)
