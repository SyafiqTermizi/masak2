import pytest

from django.urls import resolve, reverse


def test_login_url():
    assert reverse("users:login") == "/users/login"


def test_logout_url():
    assert reverse("users:logout") == "/users/logout"
