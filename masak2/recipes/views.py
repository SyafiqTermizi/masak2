import json
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from steps.serializers import StepSerializer
from ingredients.models import IngredientGroup, IngredientName, Ingredient

from .models import Recipe
from .serializers import RecipeSerializer, MediaSerializer


class RecipeViewSet(ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def create(self, request, *args, **kwargs):
        recipe = None
        req = {
            "name": request.data["name"],
            "description": request.data["description"],
            "difficulty": request.data["difficulty"],
            "medias": [{"media": request.data["medias"]}],
            "steps": json.loads(request.data["steps"]),
        }
        recipe_serializer = self.get_serializer(data=req)

        if recipe_serializer.is_valid(raise_exception=True):
            recipe = recipe_serializer.save(created_by=request.user)

            self.create_ingredients(recipe, request.data["ingredients"])

        headers = self.get_success_headers(recipe_serializer.data)
        return Response(data=recipe_serializer.data, status=200, headers=headers)

    def create_ingredients(self, recipe, ingredients):
        group = IngredientGroup.objects.create(recipe=recipe)
        ingredient_names = [
            IngredientName.objects.get_or_create(name=item["name"])[0]
            for item in json.loads(ingredients)
        ]

        for name in ingredient_names:
            Ingredient.objects.create(name=name, group=group)
