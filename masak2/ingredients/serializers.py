from rest_framework import serializers


from .models import IngredientGroup, IngredientName, IngredientUnit, Ingredient


class IngredientSerializer(serializers.ModelSerializer):
    unit = serializers.CharField()
    name = serializers.CharField()

    class Meta:
        model = Ingredient
        fields = ("id", "name", "unit", "note", "group", "amount")


class GroupSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True)

    class Meta:
        model = IngredientGroup
        fields = (
            "id",
            "name",
            "recipe",
            "ingredients",
        )
