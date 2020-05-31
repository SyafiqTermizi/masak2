from django.contrib import admin

from .models import Recipe, IngredientName, IngredientUnit, Ingredient, Media


class RecipeAdmin(admin.ModelAdmin):
    pass


class IngredientNameAdmin(admin.ModelAdmin):
    pass


class IngredientUnitAdmin(admin.ModelAdmin):
    pass


class IngredientAdmin(admin.ModelAdmin):
    pass


class MediaAdmin(admin.ModelAdmin):
    pass


admin.site.register(Media, MediaAdmin)
admin.site.register(Ingredient, IngredientAdmin)
admin.site.register(IngredientUnit, IngredientUnitAdmin)
admin.site.register(IngredientName, IngredientNameAdmin)
admin.site.register(Recipe, RecipeAdmin)
