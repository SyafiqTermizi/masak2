from rest_framework import serializers

from .models import Recipe, Ingredient


class IngredientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ingredient
        fields = '__all__'


class RecipeSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer(many=True)

    class Meta:
        model = Recipe
        fields = '__all__'
