from django.db import models


class IngredientName(models.Model):
    name = models.CharField(
        max_length=255,
        help_text="onions, flour..."
    )

    def __str__(self):
        return self.name


class IngredientUnit(models.Model):
    name = models.CharField(
        max_length=255,
        help_text="table spoon, kg, pinch..."
    )

    def __str__(self):
        return self.name


class Recipe(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    ingredient_amount = models.CharField(max_length=255)
    ingredient_unit = models.ManyToManyField(IngredientUnit)
    ingredient_name = models.ManyToManyField(
        IngredientName,
        related_name='recipes'
    )
    cooking_step = models.TextField()

    def __str__(self):
        return self.name


class Media(models.Model):
    MEDIA_TYPES = (
        ('IMG', 'image'),
        ('VID', 'vid')
    )
    media_type = models.CharField(max_length=255, choices=MEDIA_TYPES)
    image = models.CharField(max_length=255)
    recipe = models.ForeignKey(
        to=Recipe,
        related_name='medias',
        on_delete=models.CASCADE
    )