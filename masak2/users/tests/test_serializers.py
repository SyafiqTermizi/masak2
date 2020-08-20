import pytest
from rest_framework.serializers import ValidationError

from users.serializers import AddSavedRecipeSerializer

pytestmark = pytest.mark.django_db


def test_addsavedrecipeserializer_validate_valid(recipe):
    data = {"recipe_id": recipe.id}
    serializer = AddSavedRecipeSerializer(data=data)
    assert serializer.is_valid()


def test_addsavedrecipeserializer_validate_not_valid():
    """
    Calling the serializer with non existent recipe ID should raise validation error
    """
    data = {"recipe_id": 999}
    serializer = AddSavedRecipeSerializer(data=data)

    with pytest.raises(ValidationError):
        serializer.is_valid(raise_exception=True)
