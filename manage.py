#!/usr/bin/env python
import os
import sys
import webbrowser
import threading

def open_browser():
    import time
    time.sleep(3)  # Wait for server to start
    webbrowser.open('http://127.0.0.1:3000') #was 8000

def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'healthapp.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and available on your PYTHONPATH?"
        ) from exc
    
    #if 'runserver' in sys.argv:
    #    threading.Thread(target=open_browser, daemon=True).start()
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
