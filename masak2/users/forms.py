from django import forms
from django.contrib.auth import authenticate


class LoginForm(forms.Form):
    username = forms.CharField(
        min_length=5, max_length=255, required=True, label="Username or Email"
    )
    password = forms.CharField(widget=forms.PasswordInput(), required=True)

    def __init__(self, request=None, *args, **kwargs):
        self.user_cache = None
        self.request = request
        return super().__init__(*args, **kwargs)

    def clean(self):
        username = self.cleaned_data.get("username")
        password = self.cleaned_data.get("password")

        self.user_cache = authenticate(
            request=self.request, username=username, password=password
        )

        if not self.user_cache:
            raise forms.ValidationError(
                "Invalid credentials", code="invalid_credential"
            )

        return self.cleaned_data

    def get_user(self):
        return self.user_cache
