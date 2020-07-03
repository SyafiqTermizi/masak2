from django.contrib import admin

from .models import Ingredient, IngredientName, IngredientUnit, IngredientGroup


class IngredientAdmin(admin.ModelAdmin):
    pass


class NameAdmin(admin.ModelAdmin):
    pass


class UnitAdmin(admin.ModelAdmin):
    pass


class GroupAdmin(admin.ModelAdmin):
    pass


admin.site.register(Ingredient, IngredientAdmin)
admin.site.register(IngredientName, NameAdmin)
admin.site.register(IngredientUnit, UnitAdmin)
admin.site.register(IngredientGroup, GroupAdmin)
