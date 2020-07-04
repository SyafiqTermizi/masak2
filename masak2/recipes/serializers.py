from rest_framework import serializers

from ingredients.serializers import GroupSerializer
from steps.serializers import StepSerializer

from .models import Recipe, Media


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ("media_type", "media")


class RecipeSerializer(serializers.ModelSerializer):
    created_by = serializers.CharField()
    medias = MediaSerializer(many=True)
    groups = GroupSerializer(many=True)
    steps = StepSerializer(many=True)

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
