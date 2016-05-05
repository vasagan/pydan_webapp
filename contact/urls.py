# Contact US URL Configuration - host/contact redirects here


"""
This app handles Contact Us form POST API Call from website
"""
from django.conf.urls import url, include
from . import views

urlpatterns = [
    url(r'^$', views.SaveMessage.as_view(), name='Contact'),
]