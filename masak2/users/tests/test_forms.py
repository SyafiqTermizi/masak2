import pytest
from django.contrib.auth import get_user_model
from django.test.client import RequestFactory
from users.forms import LoginForm

pytestmark = pytest.mark.django_db
UserModel = get_user_model()


def test_login_form_username_length():
    """
    Username should be longer than 4 character
    """
    creds = {"username": "test"}
    form = LoginForm(data=creds)

    assert not form.is_valid()
    assert form.errors["username"] == [
        "Ensure this value has at least 5 characters (it has 4)."
    ]

    creds = {"username": "tests"}
    form = LoginForm(data=creds)

    assert not form.is_valid()
    assert form.errors.get("username") == None


def test_login_form_required_field():
    creds = {"username": "", "password": ""}
    form = LoginForm(data=creds)

    assert not form.is_valid()
    assert form.errors["username"] == ["This field is required."]
    assert form.errors["password"] == ["This field is required."]


def test_login_form_clean_method():
    # form should no be valid because user does not exist
    creds = {"username": "tests", "password": "password"}
    form = LoginForm(data=creds)

    assert not form.is_valid()

    # user and request setup
    user = UserModel.objects.create_user(
        username="tests", password="password", email="test@test.com"
    )
    request = RequestFactory()
    request.user = user
    form = LoginForm(request=request, data=creds)

    # form should be valid because user exist in DB
    assert form.is_valid()
    # form.clean should return cleaned data as a dict
    assert form.clean() == creds
    # calling form.get_user should return authenticated user
    assert form.get_user() == user
