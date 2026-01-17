# HealthApp (Django + React + Bootstrap)

Quick starter project that provides a simple health profile form implemented with React and Bootstrap, saving data to a Django backend (SQLite).

Setup

1. Create and activate a virtual environment (Windows PowerShell):

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

2. Run migrations and start the dev server:

```powershell
python manage.py migrate
python manage.py runserver
```

3. Open http://127.0.0.1:8000/ to see the form. Submissions will be saved to SQLite database `db.sqlite3`.

Notes

- This is minimal scaffolding to get started. Consider adding authentication, CSRF protection for production, and better API validation.
