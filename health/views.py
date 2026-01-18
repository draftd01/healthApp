import json
import os
from django.conf import settings
from django.http import FileResponse, JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt

from .models import Patient


def index(request):
    """
    Serve the React SPA.
    
    DEVELOPMENT: Run 'npm run dev' in separate terminal.
    React app runs on http://localhost:3000
    Access there, NOT via Django on port 8000.
    
    PRODUCTION: Run 'npm run build' first, then Django serves from dist/.
    """
    # Try to serve built React app (production build)
    print("Serving React SPA")
    dist_index = os.path.join(settings.BASE_DIR, 'dist', 'index.html')
    
    if os.path.exists(dist_index):
        with open(dist_index, 'r', encoding='utf-8') as f:
            content = f.read()
        from django.http import HttpResponse
        return HttpResponse(content, content_type='text/html')
    
    # Fallback: serve old template (for development)
    from django.shortcuts import render
    return render(request, 'health/index.html')


@csrf_exempt
@require_POST
def create_profile(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
    except Exception:
        return JsonResponse({'ok': False, 'error': 'Invalid JSON'}, status=400)

    profile = Patient.objects.create(
        first_name=data.get('first_name', '').strip(),
        last_name=data.get('last_name', '').strip(),
        age=data.get('age') or None,
        height_cm=data.get('height_cm') or None,
        weight_kg=data.get('weight_kg') or None,
        notes=data.get('notes', '')[:1000],
    )

    return JsonResponse({'ok': True, 'id': profile.id})
