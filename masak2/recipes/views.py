import json
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from steps.serializers import StepSerializer
from steps.models import Step

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

        if recipe:
            steps = [
                {**item, "recipe": recipe.id}
                for item in json.loads(request.data["directions"])
            ]
            step_serializer = StepSerializer(data=steps, many=True)
            step_serializer.is_valid(raise_exception=False)
            step_serializer.save()

        return Response(status=200)
