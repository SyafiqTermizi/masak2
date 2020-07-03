from rest_framework import serializers

from .models import Recipe, Ingredient, Media


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ("media_type", "media")


class IngredientSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    unit = serializers.CharField()

    class Meta:
        model = Ingredient
        fields = ("name", "unit", "amount", "note")


class RecipeSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer(many=True)
    medias = MediaSerializer(many=True)

    class Meta:
        model = Recipe
        fields = "__all__"
