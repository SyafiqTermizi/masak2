from rest_framework import routers

from .views import GroupViewSet, IngredientViewSet

router = routers.SimpleRouter()
router.register(r"groups", GroupViewSet)
router.register(r"ingredients", IngredientViewSet)
urlpatterns = router.urls
