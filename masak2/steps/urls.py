from rest_framework import routers

from .views import StepViewSet

router = routers.SimpleRouter()
router.register(r"steps", StepViewSet)
urlpatterns = router.urls
