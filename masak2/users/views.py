from django.contrib.auth.views import LogoutView
from django.contrib.auth import login
from django.views.decorators.csrf import csrf_protect
from django.shortcuts import HttpResponseRedirect, render

from rest_framework import generics, response
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from recipes.models import Recipe

from .serializers import (
    SavedRecipeSerializer,
    ValidateRecipeSerializer,
    MadeRecipeSerializer,
)
from .models import SavedRecipe, MadeRecipe
from .forms import LoginForm


@csrf_protect
def login_view(request):

    if request.method == "POST":
        form = LoginForm(request, request.POST)

        if form.is_valid():
            login(request, form.get_user())
            return HttpResponseRedirect("/#/home")
    else:
        form = LoginForm()

    return render(request, "registration/login.html", context={"form": form})


class SavedRecipeViewAPIView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = "user_id"
    lookup_url_kwarg = "user_id"
    serializer_class = SavedRecipeSerializer
    queryset = SavedRecipe.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

    def update(self, request, *args, **kwargs):
        """
        This method is used to add recipe to SavedRecipe. It accepts request.data
        as follows:
        {'recipe_id': <id>}
        """

        serializer = ValidateRecipeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        instance = self.get_object()
        instance.recipes.add(serializer.recipe)

        return response.Response(data=SavedRecipeSerializer(instance=instance).data)

    def destroy(self, request, *args, **kwargs):
        """
        This method is used to remove recipe from SavedRecipe. It accepts request.data
        as follows:
        {'recipe_id': <id>}
        """
        serializer = ValidateRecipeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        instance = self.get_object()
        instance.recipes.remove(serializer.recipe)

        return response.Response(data=SavedRecipeSerializer(instance=instance).data)


class MadeRecipeViewAPIView(generics.RetrieveDestroyAPIView):
    lookup_field = "user_id"
    lookup_url_kwarg = "user_id"
    serializer_class = MadeRecipeSerializer
    queryset = MadeRecipe.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

    def update(self, request, *args, **kwargs):
        """
        This method is used to add recipe to MadeRecipe. It accepts request.data
        as follows:
        {'recipe_id': <id>}
        """

        serializer = ValidateRecipeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        instance = self.get_object()
        instance.recipes.add(serializer.recipe)

    def destroy(self, request, *args, **kwargs):
        """
        This method is used to remove recipe from MadeRecipe. It accepts request.data
        as follows:
        {'recipe_id': <id>}
        """
        serializer = ValidateRecipeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        instance = self.get_object()
        instance.recipes.remove(serializer.recipe)

        return response.Response(data=MadeRecipeSerializer(instance=instance).data)
