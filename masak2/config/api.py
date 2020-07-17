from rest_framework import routers

from recipes.views import RecipeViewSet, MediaViewSet

router = routers.DefaultRouter()
router.register("recipes", RecipeViewSet)
router.register("medias", MediaViewSet)

urlpatterns = router.urls
