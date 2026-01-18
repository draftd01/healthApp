from django.contrib import admin
from .models import Patient


@admin.register(Patient)
class HealthProfileAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'dob') #, 'created_at')
