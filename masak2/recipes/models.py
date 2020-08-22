from django.db import models
from django.contrib.auth import get_user_model

from tags.models import Tag

User = get_user_model()


class Recipe(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255, blank=True)
    difficulty = models.IntegerField()
    created_by = models.ForeignKey(
        to=User, on_delete=models.SET_NULL, null=True, related_name="recipes"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField(to=Tag, related_name="recipes")

    def __str__(self):
        return self.name


class Media(models.Model):
    MEDIA_TYPES = (("IMG", "image"), ("VID", "vid"))
    media_type = models.CharField(max_length=255, choices=MEDIA_TYPES, default="IMG")
    media = models.FileField(upload_to="recipes")
    recipe = models.ForeignKey(
        to=Recipe, related_name="medias", on_delete=models.CASCADE
    )
