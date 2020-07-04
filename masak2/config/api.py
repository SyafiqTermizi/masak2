from rest_framework import routers

from steps.views import StepViewSet
from ingredients.views import IngredientViewSet, GroupViewSet
from recipes.views import RecipeViewSet

router = routers.DefaultRouter()
router.register(r"steps", StepViewSet)
router.register(r"ingredients", IngredientViewSet)
router.register(r"groups", GroupViewSet)
router.register("recipes", RecipeViewSet)

urlpatterns = router.urls
