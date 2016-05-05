from django.db import models
from datetime import datetime
from django.utils import timezone

# Create your models here.


class Message(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    company = models.CharField(max_length=100, blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(blank=True, null=True)


    def __str__(self):
        return self.name