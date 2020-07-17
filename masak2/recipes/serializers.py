from rest_framework import serializers

from steps.models import Step
from steps.serializers import StepSerializer
from ingredients.serializers import GroupSerializer

from .models import Recipe, Media


class MediaSerializer(serializers.ModelSerializer):
    recipe = serializers.IntegerField(source="recipe.pk", read_only=True)

    class Meta:
        model = Media
        fields = ("id", "media_type", "media", "recipe")


class RecipeSerializer(serializers.ModelSerializer):
    created_by = serializers.CharField(read_only=True)
    medias = MediaSerializer(many=True)
    steps = StepSerializer(many=True)
    groups = GroupSerializer(many=True, read_only=True)

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
        media_arr = validated_data.pop("medias")
        step_arr = validated_data.pop("steps")

        recipe = Recipe.objects.create(**validated_data)

        medias = []
        for media in media_arr:
            medias.append(Media(recipe=recipe, **media))
        Media.objects.bulk_create(medias)

        steps = []
        for step in step_arr:
            steps.append(Step(recipe=recipe, **step))
        Step.objects.bulk_create(steps)

        return recipe
