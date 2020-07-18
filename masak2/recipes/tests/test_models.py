import pytest


def test_recipe_str(recipe):
    assert recipe.__str__() == str(recipe)
