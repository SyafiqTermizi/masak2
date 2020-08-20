import pytest

from django.contrib.auth import get_user_model

from recipes.models import Recipe
from steps.models import Step
from tags.models import Tag
from ingredients.models import (
    IngredientGroup,
    Ingredient,
    IngredientName,
    IngredientUnit,
)

UserModel = get_user_model()


@pytest.fixture
def name():
    return IngredientName.objects.create(name="name")


@pytest.fixture
def unit():
    return IngredientUnit.objects.create(name="unit")


@pytest.fixture
def step(recipe):
    return Step(recipe=recipe, step="step")


@pytest.fixture
def user():
    return UserModel.objects.create(
        username="username", password="password", email="email"
    )


@pytest.fixture
def recipe(user):
    return Recipe.objects.create(
        name="recipe", created_by=user, description="test", difficulty=1
    )


@pytest.fixture
def ingredient(name, unit, group):
    return Ingredient.objects.create(name=name, unit=unit, amount="1", group=group)


@pytest.fixture
def group(recipe):
    return IngredientGroup.objects.create(name="group", recipe=recipe)


@pytest.fixture
def ingredient_data(ingredient):
    return {
        "id": None,
        "group": None,
        "note": "",
        "name": ingredient.name.name,
        "unit": ingredient.unit.name,
        "amount": ingredient.amount,
    }


@pytest.fixture
def recipe_data(recipe):
    return {
        "name": "recipe name",
        "description": "description",
        "difficulty": 1,
        "tags": [{"name": "test", "media": "test", "id": 1}],
        "groups": [
            {
                "name": "",
                "ingredients": [
                    {
                        "name": "an ingredient name",
                        "note": "",
                        "amount": "",
                        "unit": "kg",
                    }
                ],
            }
        ],
        "steps": [{"step": "steps"}],
    }


@pytest.fixture
def tag():
    return Tag(name="testtag")
