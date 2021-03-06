import pytest

from recipes.serializers import RecipeSerializer

pytestmark = pytest.mark.django_db


def test_serialize_recipe_serializer(recipe_data):
    """
    RecipeSerializer should serialize data correctly
    """
    serializer = RecipeSerializer(data=recipe_data)
    serializer.is_valid()
    recipe = serializer.save()
    serialized_recipe = RecipeSerializer(instance=recipe)

    assert serialized_recipe.data["id"] == recipe.id
    assert serialized_recipe.data["name"] == recipe.name
    assert serialized_recipe.data["description"] == recipe.description
    assert serialized_recipe.data["difficulty"] == recipe.difficulty
    assert serialized_recipe.data["created_by"] == recipe.created_by


def test_deserialize_recipe_serializer(recipe_data):
    """
    RecipeSerializer should deserialize recipe instance correctly
    """
    deserialized_recipe = RecipeSerializer(data=recipe_data)
    assert deserialized_recipe.is_valid()


@pytest.mark.parametrize(
    ("data", "is_valid"),
    (
        (
            {
                "name": "recipe name",
                "description": "description",
                "difficulty": 1,
                "tags": [{"name": "test", "media": "test"}],
                "groups": [
                    {
                        "name": "",
                        "ingredients": [
                            {"name": "an ingredient name", "note": "", "amount": ""}
                        ],
                    }
                ],
                "steps": [{"step": "steps"}],
            },
            True,
        ),
        (
            {
                "description": "description",
                "difficulty": 1,
                "groups": [
                    {
                        "name": "",
                        "ingredients": [
                            {"name": "an ingredient name", "note": "", "amount": ""}
                        ],
                    }
                ],
                "steps": [{"step": "steps"}],
            },
            False,
        ),
        (
            {
                "name": "recipe name",
                "description": "description",
                "groups": [
                    {
                        "name": "",
                        "ingredients": [
                            {"name": "an ingredient name", "note": "", "amount": ""}
                        ],
                    }
                ],
                "steps": [{"step": "steps"}],
            },
            False,
        ),
        (
            {
                "name": "recipe name",
                "description": "description",
                "difficulty": 1,
                "steps": [{"step": "steps"}],
            },
            False,
        ),
        (
            {
                "name": "recipe name",
                "description": "description",
                "difficulty": 1,
                "groups": [
                    {
                        "name": "",
                        "ingredients": [
                            {"name": "an ingredient name", "note": "", "amount": ""}
                        ],
                    }
                ],
            },
            False,
        ),
        (
            {
                "name": "recipe name",
                "description": "description",
                "difficulty": 1,
                "groups": [{"name": "",}],
                "steps": [{"step": "steps"}],
            },
            False,
        ),
        (
            {
                "name": "recipe name",
                "description": "description",
                "difficulty": 1,
                "groups": [
                    {
                        "name": "",
                        "ingredients": [
                            {"name": "an ingredient name", "note": "", "amount": ""}
                        ],
                    }
                ],
                "steps": [{}],
            },
            False,
        ),
    ),
)
def test_deserialize_ingredient_serializer_fields(data, is_valid):
    """
    test whether each data passed to serializer is valid
    """
    deserialized_data = RecipeSerializer(data=data)
    assert deserialized_data.is_valid() == is_valid


def test_recipe_serializer_create_method(recipe_data):
    deserialized_data = RecipeSerializer(data=recipe_data)
    assert deserialized_data.is_valid()
    recipe = deserialized_data.save()
    assert recipe.name == recipe_data["name"]
