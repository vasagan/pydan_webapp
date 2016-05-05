from rest_framework import serializers
from .models import *
from .views import *
from django.core import exceptions



class SaveMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['name', 'email', 'company', 'phone', 'message']





