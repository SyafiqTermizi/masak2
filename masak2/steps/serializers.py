from rest_framework import serializers

from .models import Step


class StepSerializer(serializers.ModelSerializer):
    recipe = serializers.IntegerField(source="recipe.pk", read_only=True)

    class Meta:
        model = Step
        fields = ("id", "recipe", "step")
