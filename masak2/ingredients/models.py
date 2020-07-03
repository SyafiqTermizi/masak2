from django.db import models

from recipes.models import Recipe


class IngredientGroup(models.Model):
    name = models.CharField(max_length=255, default="", blank=True)
    recipe = models.ForeignKey(
        to=Recipe, on_delete=models.CASCADE, related_name="groups"
    )


class IngredientName(models.Model):
    name = models.CharField(max_length=255, help_text="onion, flour...")

    def __str__(self):
        return self.name


class IngredientUnit(models.Model):
    name = models.CharField(
        max_length=255, help_text="table spoon, kg, pinch...", unique=True
    )

    def __str__(self):
        return self.name


class Ingredient(models.Model):
    name = models.ForeignKey(
        to=IngredientName,
        on_delete=models.SET_NULL,
        null=True,
        related_name="ingredients",
    )
    unit = models.ForeignKey(to=IngredientUnit, on_delete=models.SET_NULL, null=True)
    note = models.CharField(max_length=255)
    group = models.ForeignKey(
        to=IngredientGroup, on_delete=models.CASCADE, related_name="ingredients"
    )

    def __str__(self):
        return self.name
