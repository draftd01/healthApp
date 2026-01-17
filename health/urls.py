from django.urls import path
from . import views

app_name = 'health'

urlpatterns = [
    # API endpoints (specific routes first - Django matches in order)
    path('api/profile/', views.create_profile, name='create_profile'),
    # React SPA catch-all (must be last so other routes are matched first)
    path('', views.index, name='index'),
]
