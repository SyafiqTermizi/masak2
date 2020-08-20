from rest_framework import serializers

from recipes.models import Recipe

from .models import SavedRecipe


class SavedRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedRecipe
        fields = "__all__"


class AddSavedRecipeSerializer(serializers.Serializer):
    recipe_id = serializers.IntegerField()

    def __init__(self, *args, **kwargs):
        self.recipe = None
        return super().__init__(*args, **kwargs)

    def validate_recipe_id(self, value):
        try:
            recipe = Recipe.objects.get(pk=value)
        except Recipe.DoesNotExist:
            raise serializers.ValidationError("Not found", code="404")
        else:
            self.recipe = recipe
        return value
