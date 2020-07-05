import pytest


def test_step_str(step):
    assert step.__str__() == str(step)
