from django.db import models


class IngredientName(models.Model):
    name = models.CharField(
        max_length=255,
        help_text="onions, flour...",
        unique=True
    )

    def __str__(self):
        return self.name


class IngredientUnit(models.Model):
    name = models.CharField(
        max_length=255,
        help_text="table spoon, kg, pinch...",
        unique=True
    )

    def __str__(self):
        return self.name


class Ingredient(models.Model):
    name = models.ForeignKey(IngredientName, on_delete=models.CASCADE,)
    unit = models.ForeignKey(
        IngredientUnit,
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )
    amount = models.CharField(max_length=255, blank=True)
    note = models.CharField(max_length=255, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['name', 'unit', 'amount',],
                name='unique ingredients'
            )
        ]

    def __str__(self):
        return f"{self.amount} {self.unit or ''} {self.name} {self.note or ''}"


class Recipe(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255, blank=True)
    ingredient = models.ManyToManyField(Ingredient, related_name='recipes')
    cooking_step = models.TextField()

    def __str__(self):
        return self.name


class Media(models.Model):
    MEDIA_TYPES = (
        ('IMG', 'image'),
        ('VID', 'vid')
    )
    media_type = models.CharField(max_length=255, choices=MEDIA_TYPES)
    media = models.FileField(upload_to='recipes')
    recipe = models.ForeignKey(
        to=Recipe,
        related_name='medias',
        on_delete=models.CASCADE
    )