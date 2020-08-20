import pytest

pytestmark = pytest.mark.django_db


def test_step_str(step):
    assert step.__str__() == str(step)
