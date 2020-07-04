from rest_framework import serializers

from .models import Recipe, Media


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ("media_type", "media")


class RecipeSerializer(serializers.ModelSerializer):
    created_by = serializers.CharField()
    medias = MediaSerializer(many=True)

    class Meta:
        model = Recipe
        fields = ("name", "description", "difficulty", "created_by", "medias")
