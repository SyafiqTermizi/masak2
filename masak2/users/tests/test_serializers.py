import pytest
from rest_framework.serializers import ValidationError

from users.serializers import ValidateRecipeSerializer

pytestmark = pytest.mark.django_db


def test_ValidateRecipeSerializer_validate_valid(recipe):
    data = {"recipe_id": recipe.id}
    serializer = ValidateRecipeSerializer(data=data)
    assert serializer.is_valid()


def test_ValidateRecipeSerializer_validate_not_valid():
    """
    Calling the serializer with non existent recipe ID should raise validation error
    """
    data = {"recipe_id": 999}
    serializer = ValidateRecipeSerializer(data=data)

    with pytest.raises(ValidationError):
        serializer.is_valid(raise_exception=True)
