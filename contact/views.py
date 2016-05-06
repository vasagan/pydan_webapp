from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from rest_framework import generics, viewsets, serializers, permissions
from .serializers import *
from django.core.mail import send_mail
# Create your views here.

@api_view(['GET', 'POST'])
def save_message(request):
    if request.method == 'POST':
        name = request.data['name']
        email = request.data['email']
        company = request.data['company']
        phone = request.data['phone']
        message = request.data['message']
        captcha = request.data['captcha']
        csrf_token = request.data['csrfmiddlewaretoken']

        str = name + email + company + phone + message + captcha + csrf_token

        return Response({"message": str })
    return Response({
        "status": "success", # success or failure
        "message": "Sorry, GET request is not allowed"
    })



class SaveMessage(generics.CreateAPIView):
    serializer_class = SaveMessageSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        return Message.objects.all()
"""
    def  perform_create(self, serializer):
        serializer.save()
        send_mail('Test Email', 'Here is the message.', 'vasagan@orgbasket.com',['vasagant@gmail.com'], fail_silently=False)
"""