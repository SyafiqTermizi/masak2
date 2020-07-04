from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import Step
from .serializers import StepSerializer


class StepViewSet(ReadOnlyModelViewSet):
    queryset = Step.objects.all()
    serializer_class = StepSerializer
