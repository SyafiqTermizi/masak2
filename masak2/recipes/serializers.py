from rest_framework import serializers

from ingredients.serializers import GroupSerializer
from steps.serializers import StepSerializer

from .models import Recipe, Media


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ("id", "media_type", "media", "recipe")


class RecipeSerializer(serializers.ModelSerializer):
    created_by = serializers.CharField(read_only=True)
    medias = MediaSerializer(many=True, read_only=True)
    groups = GroupSerializer(many=True, read_only=True)
    steps = StepSerializer(many=True, read_only=True)

    class Meta:
        model = Recipe
        fields = (
            "id",
            "name",
            "description",
            "difficulty",
            "created_by",
            "medias",
            "groups",
            "steps",
        )
