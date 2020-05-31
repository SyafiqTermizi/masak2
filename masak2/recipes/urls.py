from rest_framework import routers

from .views import RecipeViewSet

router = routers.SimpleRouter()
router.register(r'recipes', RecipeViewSet)
urlpatterns = router.urls
