import pytest

from ingredients.serializers import IngredientSerializer


def test_serialize_ingredient_serializer(ingredient, ingredient_data):
    """
    IngredientSerializer should serialize ingredient instance correctly
    """
    serialized_ingredient = IngredientSerializer(instance=ingredient)
    assert serialized_ingredient.data == ingredient_data


def test_deserialize_ingredient_serializer(ingredient_data):
    """
    IngredientSerializer should deserialize ingredient instance correctly
    """
    deserialized_data = IngredientSerializer(data=ingredient_data)
    assert deserialized_data.is_valid()


@pytest.mark.parametrize(
    ("data", "is_valid"),
    (
        ({"name": "name", "amount": "amount"}, True,),
        ({"name": "name", "amount": "amount", "unit": "unit"}, True,),
        ({"amount": "amount", "unit": "unit"}, False,),
    ),
)
def test_ingredient_serializer_fields(data, is_valid):
    """
    test whether each data passed to serializer is valid
    """
    deserialized_data = IngredientSerializer(data=data)
    assert deserialized_data.is_valid() == is_valid
