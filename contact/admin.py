from django.contrib import admin
from .models import *
# Register your models here.


class MessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'company','phone', 'created_at','message']


admin.site.register(Message,MessageAdmin)