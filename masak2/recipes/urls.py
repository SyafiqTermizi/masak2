from django.urls import path
from .views import IndexViews


app_name = "recipes"
urlpatterns = [
    path("", IndexViews.as_view(), name="index"),
]
