import pytest

from django.contrib.auth import get_user_model

from recipes.models import Recipe
from steps.models import Step
from ingredients.models import (
    IngredientGroup,
    Ingredient,
    IngredientName,
    IngredientUnit,
)

UserModel = get_user_model()


@pytest.fixture
def recipe():
    return Recipe(name="recipe", created_by=None)


@pytest.fixture
def group(recipe):
    return IngredientGroup(name="group", recipe=recipe)


@pytest.fixture
def name():
    return IngredientName(name="name")


@pytest.fixture
def unit():
    return IngredientUnit(name="unit")


@pytest.fixture
def ingredient(name, unit, group):
    return Ingredient(name=name, unit=unit, amount="1", group=group)


@pytest.fixture
def step(recipe):
    return Step(recipe=recipe, step="step")


@pytest.fixture
def user():
    return UserModel(username="username", password="password", email="email")

