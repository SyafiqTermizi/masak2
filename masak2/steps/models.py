from django.db import models

from recipes.models import Recipe


class Step(models.Model):
    recipe = models.ForeignKey(to=Recipe, on_delete=models.CASCADE)
    step = models.TextField()

    def __str__(self):
        return f"{self.recipe.name} {self.step}"
