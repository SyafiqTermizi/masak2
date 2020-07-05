from rest_framework import routers

from recipes.views import RecipeViewSet

router = routers.DefaultRouter()
router.register("recipes", RecipeViewSet)

urlpatterns = router.urls
