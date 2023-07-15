from django.db import models

# Create your models here.
class JsonHandler(models.Model):
    username = models.CharField(max_length=255)
    data = models.JSONField()

    