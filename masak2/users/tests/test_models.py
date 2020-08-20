import pytest
from django.contrib.auth import get_user_model

from users.models import SavedRecipe

pytestmark = pytest.mark.django_db
UserModel = get_user_model()


def test_user_str(user):
    assert user.__str__() == str(user)


def test_user_signal():
    # SavedRecipe should be empty because no user is created
    assert SavedRecipe.objects.count() == 0

    # Create a user
    user = UserModel.objects.create_user(
        username="test", email="test@test.com", password="test"
    )

    # SavedRecipe should be 1 because user is created
    assert SavedRecipe.objects.count() == 1

    # updating user
    user.email = "t@t.com"
    user.save()

    # SavedRecipe should not increase when update
    assert SavedRecipe.objects.count() == 1
