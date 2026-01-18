from django.db import models
from django.contrib.auth.models import AbstractUser


class Patient(AbstractUser):
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='patient_set',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='patient_set',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )
    
    first_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    dob = models.DateField(null=True, blank=True)
    height_in = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    weight_lbs = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    bmi = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    ethnicity = models.CharField(max_length=100, blank=True)
    race = models.CharField(max_length=100, blank=True)
    biological_sex = models.CharField(max_length=50, blank=True)
    country_of_birth = models.CharField(max_length=100, blank=True)
    city_of_residence = models.CharField(max_length=100, blank=True)
    state_of_residence = models.CharField(max_length=100, blank=True)
    country_of_residence = models.CharField(max_length=100, blank=True)
    occupation = models.CharField(max_length=100, blank=True)
    is_retired = models.BooleanField(default=False)
    medications = models.TextField(blank=True)
    allergies = models.TextField(blank=True)
    family_medical_history = models.TextField(blank=True)
    personal_medical_history = models.TextField(blank=True)
    personal_surgical_history = models.TextField(blank=True)

class Record(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='medical_records')
    record_date = models.DateField()
    bp = models.CharField(max_length=20, blank=True)  # Blood Pressure
    medications = models.TextField(blank=True)
    allergies = models.TextField(blank=True)
    new_medical_conditions = models.TextField(blank=True)
    new_surgeries = models.TextField(blank=True)
    monthly_avg_steps = models.IntegerField(null=True, blank=True)
    monthly_avg_sleep_hours = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)

class LabResults(models.Model):
    record = models.ForeignKey(Record, on_delete=models.CASCADE, related_name='lab_results')
    test_date = models.DateField()
    creatinine = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    bun = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    hem_A1c = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    ldl = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    triglycerides = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    tsh = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    hematocrit = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    wbc = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    mcv = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}".strip()
