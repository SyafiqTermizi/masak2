import json
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from steps.serializers import StepSerializer
from ingredients.serializers import IngredientSerializer
from ingredients.models import IngredientGroup, IngredientName, Ingredient

from .models import Recipe
from .serializers import RecipeSerializer


class RecipeViewSet(ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def create(self, request, *args, **kwargs):
        recipe = None

        recipe_serializer = self.get_serializer(data=request.data)
        if recipe_serializer.is_valid(raise_exception=True):
            recipe = recipe_serializer.save(created_by=request.user)

            ingredients = request.data["ingredients"]
            self.create_ingredients(recipe, ingredients)

            directions = request.data["directions"]
            self.create_directions(recipe, directions)

        return Response(status=200)

    def create_ingredients(self, recipe, ingredients):
        group = IngredientGroup.objects.create(recipe=recipe)
        ingredient_names = [
            IngredientName.objects.get_or_create(name=item["name"])[0]
            for item in json.loads(ingredients)
        ]

        for name in ingredient_names:
            Ingredient.objects.create(name=name, group=group)

    def create_directions(self, recipe, directions):
        steps = [{**item, "recipe": recipe.id} for item in json.loads(directions)]
        step_serializer = StepSerializer(data=steps, many=True)
        step_serializer.is_valid(raise_exception=True)
        step_serializer.save()
