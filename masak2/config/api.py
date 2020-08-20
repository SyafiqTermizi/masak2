from rest_framework import routers
from django.urls import path
from recipes.views import RecipeViewSet, MediaViewSet
from tags.views import TagViewSet
from users.views import SavedRecipeViewAPIView

router = routers.DefaultRouter()
router.register("recipes", RecipeViewSet)
router.register("medias", MediaViewSet)
router.register("tags", TagViewSet)

urlpatterns = [
    path(
        "savedrecipes/<int:user_id>",
        SavedRecipeViewAPIView.as_view(),
        name="saved-recipes",
    ),
    *router.urls,
]
