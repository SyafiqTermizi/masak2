import pytest


def test_tag_str(tag):
    assert tag.__str__() == str(tag)
