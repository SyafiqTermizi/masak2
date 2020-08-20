from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.EmailField("Email address", unique=True)

    def __str__(self):
        return self.username


class SavedRecipe(models.Model):
    """
    This model store recipes that is saved by user
    """

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="saved_recipes"
    )
    recipes = models.ManyToManyField("recipes.Recipe")


def create_saved_recipes(sender, **kwargs):
    """
    Create `SavedRecipe` if and only if user is created
    """
    user = kwargs["instance"]
    is_created = kwargs["created"]

    if is_created:
        SavedRecipe.objects.create(user=user)


post_save.connect(create_saved_recipes, User)
