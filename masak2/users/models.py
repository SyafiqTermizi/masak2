from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.EmailField("Email address", unique=True)

    def __str__(self):
        return self.username


class ThroughSavedRecipe(models.Model):
    recipe = models.ForeignKey("recipes.Recipe", on_delete=models.CASCADE)
    saved_recipe = models.ForeignKey("users.SavedRecipe", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [["saved_recipe", "recipe"]]
        ordering = ["-created_at"]


class SavedRecipe(models.Model):
    """
    This model store recipes that is saved by user
    """

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="saved_recipes",
    )
    recipes = models.ManyToManyField("recipes.Recipe", through=ThroughSavedRecipe)


def create_saved_recipes(sender, **kwargs):
    """
    Create `SavedRecipe` if and only if user is created
    """
    user = kwargs["instance"]
    is_created = kwargs["created"]

    if is_created:
        SavedRecipe.objects.create(user=user)


post_save.connect(create_saved_recipes, User)
