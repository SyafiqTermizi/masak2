import pytest

pytestmark = pytest.mark.django_db


def test_recipe_str(recipe):
    assert recipe.__str__() == str(recipe)
