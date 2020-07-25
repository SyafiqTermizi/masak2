import pytest


def test_user_str(user):
    assert user.__str__() == str(user)
