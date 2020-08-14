from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=255)
    image = models.FileField(upload_to="tags", blank=True, default="")

    def __str__(self):
        return self.name
