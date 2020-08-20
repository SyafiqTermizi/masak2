import pytest

pytestmark = pytest.mark.django_db


def test_unit_str(unit):
    assert unit.__str__() == str(unit)


def test_ingredient_name(name):
    assert name.__str__() == str(name)


def test_ingredient(ingredient):
    assert ingredient.__str__() == str(ingredient)


def test_group(group):
    assert group.__str__() == str(group)
