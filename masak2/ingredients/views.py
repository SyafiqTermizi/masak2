from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import IngredientGroup, Ingredient
from .serializers import GroupSerializer, IngredientSerializer


class GroupViewSet(ReadOnlyModelViewSet):
    queryset = IngredientGroup.objects.all()
    serializer_class = GroupSerializer


class IngredientViewSet(ReadOnlyModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
