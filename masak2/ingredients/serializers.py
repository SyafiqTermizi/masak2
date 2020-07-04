from rest_framework import serializers


from .models import IngredientGroup, IngredientName, IngredientUnit, Ingredient


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = IngredientGroup
        fields = ("id", "name", "recipe")


class IngredientSerializer(serializers.ModelSerializer):
    unit = serializers.CharField()
    name = serializers.CharField()

    class Meta:
        model = Ingredient
        fields = ("name", "unit", "note", "group")
