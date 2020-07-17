from rest_framework import serializers


from .models import IngredientGroup, IngredientName, IngredientUnit, Ingredient


class IngredientSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    unit = serializers.CharField(required=False)
    group = serializers.IntegerField(source="group.pk", read_only=True)

    class Meta:
        model = Ingredient
        fields = ("id", "name", "unit", "note", "group", "amount")


class GroupSerializer(serializers.ModelSerializer):
    recipe = serializers.IntegerField(source="recipe.pk", read_only=True)
    ingredients = IngredientSerializer(many=True)

    class Meta:
        model = IngredientGroup
        fields = (
            "id",
            "name",
            "recipe",
            "ingredients",
        )
