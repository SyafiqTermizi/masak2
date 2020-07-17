from rest_framework import serializers

from steps.models import Step
from steps.serializers import StepSerializer
from ingredients.serializers import GroupSerializer
from ingredients.models import (
    IngredientGroup,
    IngredientName,
    Ingredient,
    IngredientUnit,
)

from .models import Recipe, Media


class MediaSerializer(serializers.ModelSerializer):
    recipe = serializers.IntegerField(source="recipe.pk", read_only=True)

    class Meta:
        model = Media
        fields = ("id", "media_type", "media", "recipe")


class RecipeSerializer(serializers.ModelSerializer):
    created_by = serializers.CharField(read_only=True)
    medias = MediaSerializer(many=True, read_only=True)
    steps = StepSerializer(many=True)
    groups = GroupSerializer(many=True)

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

    def create(self, validated_data):
        step_arr = validated_data.pop("steps")
        groups_arr = validated_data.pop("groups")

        recipe = Recipe.objects.create(**validated_data)

        steps = []
        for step in step_arr:
            steps.append(Step(recipe=recipe, **step))
        Step.objects.bulk_create(steps)

        for group in groups_arr:
            ingredients = group.pop("ingredients")
            group = IngredientGroup.objects.create(recipe=recipe)

            for ingredient in ingredients:
                name = IngredientName.objects.get_or_create(
                    name=ingredient.pop("name")
                )[0]

                unit = ingredient.pop("unit", None)
                if unit:
                    unit = IngredientUnit.objects.get_or_create(
                        name=ingredient.pop("unit")
                    )[0]

                Ingredient.objects.create(
                    name=name, group=group, unit=unit, **ingredient,
                )

        return recipe
