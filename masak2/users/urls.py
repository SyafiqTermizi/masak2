from django.urls import path
from .views import login_view, LogoutView


app_name = "users"
urlpatterns = [
    path("login", login_view, name="login"),
    path("logout", LogoutView.as_view(), name="logout"),
]

