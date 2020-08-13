from rest_framework import routers

from recipes.views import RecipeViewSet, MediaViewSet
from tags.views import TagViewSet

router = routers.DefaultRouter()
router.register("recipes", RecipeViewSet)
router.register("medias", MediaViewSet)
router.register("tags", TagViewSet)

urlpatterns = router.urls
