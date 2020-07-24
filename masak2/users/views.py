from django.contrib.auth.views import LogoutView
from django.contrib.auth import login, authenticate
from django.views.decorators.csrf import csrf_protect
from django.shortcuts import HttpResponseRedirect, render


@csrf_protect
def login_view(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")

        user = authenticate(request, email=email, password=password)

        if user:
            login(request, user)
            return HttpResponseRedirect("/#/home")

    return render(request, "registration/login.html")
