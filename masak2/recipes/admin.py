from django.contrib import admin

from .models import Recipe, Media


class RecipeAdmin(admin.ModelAdmin):
    pass


class MediaAdmin(admin.ModelAdmin):
    pass


admin.site.register(Media, MediaAdmin)
admin.site.register(Recipe, RecipeAdmin)
