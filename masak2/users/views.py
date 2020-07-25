from django.contrib.auth.views import LogoutView
from django.contrib.auth import login, authenticate
from django.views.decorators.csrf import csrf_protect
from django.shortcuts import HttpResponseRedirect, render

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
