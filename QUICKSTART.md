# Quick Start Guide - React Refactored HealthApp

## File Structure Overview

Your project now has a modern React structure:

```
src/
├── App.jsx                    ← Main app with routing & state
├── main.jsx                   ← Entry point
├── index.css                  ← Global styles
│
├── components/
│   ├── Layout.jsx             ← Navigation + page shell
│   └── shared/
│       └── UIComponents.jsx   ← Reusable components (Card, Alert, FormGroup)
│
├── pages/
│   ├── Dashboard.jsx          ← Health overview & risk assessments
│   ├── Profile.jsx            ← User demographics & lifestyle
│   ├── Vitals.jsx             ← Vital signs & lab input
│   ├── Conditions.jsx         ← Medical history management
│   └── Consultation.jsx       ← AI health advisor
│
├── hooks/
│   └── useHealthData.js       ← Central state management
│
├── services/
│   └── api.js                 ← Django backend API calls
│
└── utils/
    └── medicalKnowledge.js    ← Medical assessment logic
```

## Installation

1. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

2. **Update Django** to serve API endpoints:
   - Update [health/views.py](health/views.py) to return JSON instead of templates
   - Add CORS headers to [healthapp/settings.py](healthapp/settings.py)

## Running the App

### Development

**Terminal 1: Start Django backend**
```bash
python manage.py runserver
```

**Terminal 2: Start React frontend**
```bash
npm run dev
```

Visit `http://localhost:3000`

### Production

```bash
npm run build          # Creates dist/ folder
python manage.py collectstatic  # Collect frontend assets
```

## Page-by-Page Guide

### Dashboard `/`
- **Shows**: Health insights, risk assessments, overall status
- **Data from**: Profile + Vitals
- **User action**: View-only (read insights)

### Profile `/profile`
- **Shows**: User demographics, lifestyle factors, physical measurements
- **Data**: Age, gender, height, weight, smoking, exercise habits, family history
- **User action**: Edit personal info → triggers BMI calculation

### Vitals `/vitals`
- **Shows**: Blood pressure, heart rate, cholesterol, glucose, etc.
- **Sections**: Cardiovascular, Metabolic, Renal, Other labs
- **User action**: Input vital signs from recent checkups

### Conditions `/conditions`
- **Shows**: Medical conditions, medications, allergies, surgeries
- **User action**: Add/remove items from medical history
- **Key**: Allergy warnings (⚠️) for safety

### Consultation `/consultation`
- **Shows**: AI-powered health analysis based on queries
- **Examples**: "What does my blood pressure mean?" → clinical analysis
- **Output**: Risk factors, recommended tests, treatment options

## Data Flow

### How State Works

```
App.jsx (central state)
   ↓
useHealthData hook (calculates insights)
   ↓
Pages receive data as props
   ↓
User edits → callback → updates App state
   ↓
Component re-renders with new data
```

### Example: Updating Profile

```jsx
// User edits age in Profile page
<input onChange={(e) => onProfileUpdate('age', e.target.value)} />

// Calls callback
onProfileUpdate('age', '45')

// Updates App state
setUserProfile(prev => ({ ...prev, age: '45' }))

// Triggers insights recalculation
// Dashboard re-renders with new cardiovascular risk
```

## Medical Knowledge Features

The app includes built-in clinical decision support:

### Cardiovascular Risk
- Age, gender, blood pressure, cholesterol, smoking status
- Returns: Risk level (Low/Moderate/High) + risk factors

### Diabetes Risk
- BMI, HbA1c, glucose, age, family history, ethnicity
- Returns: Status + recommendations

### Symptom Analysis
- Analyzes reported symptoms
- Returns: Possible causes, red flags, recommendations

## Key Components Explained

### `useHealthData` Hook
Central state management. Use it like:
```jsx
const { userProfile, healthInsights, handleProfileUpdate } = useHealthData();
```

### Layout Component
Wraps all pages with navigation:
```jsx
<Layout>
  <Routes>
    <Route path="/" element={<Dashboard />} />
    ...
  </Routes>
</Layout>
```

### Shared Components
Reusable UI elements:
- `<Card>` - Container with header
- `<Alert>` - Info/warning/danger messages
- `<FormGroup>` - Labeled input
- `<MedicalItemList>` - Conditions/medications list

## Bootstrap CSS Classes Used

The app uses Bootstrap 5 responsive utilities:
- `container-fluid`, `row`, `col-lg-6` - Responsive grid
- `btn`, `btn-primary`, `btn-outline-danger` - Button styles
- `form-control`, `form-select` - Form inputs
- `alert`, `alert-info`, `alert-warning` - Alert messages
- `card`, `card-header`, `card-body` - Card containers
- `d-flex`, `gap-2`, `align-items-center` - Flexbox utilities

## Next: Connect to Backend

1. **Create API endpoints** in Django (return JSON):
   ```python
   @require_http_methods(["POST"])
   def create_vitals(request):
       data = json.loads(request.body)
       vital = Vital.objects.create(**data)
       return JsonResponse(vital.to_dict())
   ```

2. **Update [src/services/api.js](src/services/api.js)** with real endpoints

3. **Add error handling** in pages:
   ```jsx
   try {
     const response = await apiService.getVitals();
     setVitals(response.data);
   } catch (error) {
     setError(error.message);
   }
   ```

## Common Tasks

### Add a new form input in Profile
```jsx
<FormGroup
  label="New Field"
  input={
    <input
      type="text"
      className="form-control"
      value={userProfile.newField}
      onChange={(e) => handleChange('newField', e.target.value)}
    />
  }
/>
```

### Add a new medical assessment
```jsx
// In src/utils/medicalKnowledge.js
myNewAssessment: {
  assess: (profile, vitals) => {
    // Your logic
    return { result };
  }
}

// In useHealthData.js
insights.myNewAssessment = medicalKnowledge.myNewAssessment.assess(...);
```

### Customize styling
Edit `src/index.css` or add Bootstrap classes to JSX

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 in use | Change in `vite.config.js` → `server.port: 3001` |
| Module not found | Run `npm install` |
| Bootstrap not showing | Check CDN link in `public/index.html` |
| State not updating | Check callback naming (onProfileUpdate vs onVitalUpdate) |
| API errors | Ensure Django is running on port 8000 |

## Resources

- [React Router Docs](https://reactrouter.com/)
- [Bootstrap Utilities](https://getbootstrap.com/docs/5.3/utilities/)
- [Lucide Icons](https://lucide.dev/)
- [Vite Docs](https://vitejs.dev/)

---

**Happy coding! Your app is now modern, scalable, and ready to grow.** 🎉
