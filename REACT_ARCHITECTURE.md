# HealthApp React Refactor - Structure & Architecture

## Recommended Folder Structure

```
HealthApp/
├── public/
│   └── index.html                 # Single React mount point (no templating)
│
├── src/
│   ├── main.jsx                   # React entry point
│   ├── App.jsx                    # Main routing & state management
│   ├── index.css                  # Global styles
│   │
│   ├── components/
│   │   ├── Layout.jsx             # Base layout (nav + footer)
│   │   └── shared/
│   │       └── UIComponents.jsx   # Reusable: Card, Alert, FormGroup, MedicalItemList
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx          # Health overview & risk assessments
│   │   ├── Profile.jsx            # User info & lifestyle
│   │   ├── Vitals.jsx             # Vital signs & lab values
│   │   ├── Conditions.jsx         # Conditions, medications, allergies
│   │   └── Consultation.jsx       # AI advisor & clinical analysis
│   │
│   ├── hooks/
│   │   └── useHealthData.js       # Central state management hook
│   │
│   ├── services/
│   │   └── api.js                 # Django API client
│   │
│   └── utils/
│       └── medicalKnowledge.js    # Medical risk assessment logic
│
├── package.json                    # Updated with React deps
├── vite.config.js                 # Build configuration
├── requirements.txt               # Django dependencies
└── manage.py                      # Django CLI
```

## Data Flow Architecture

### State Management (Unidirectional Flow)

```
┌─────────────────────────────────────────────────────────────┐
│                         App.jsx                             │
│  (Central state via useHealthData hook)                     │
│                                                             │
│  State:                                                     │
│  ├── userProfile (age, gender, height, weight, etc)        │
│  ├── medicalData (conditions, medications, allergies)      │
│  ├── latestVitals (BP, HR, labs, etc)                      │
│  └── healthInsights (computed from above)                  │
└──────────────┬──────────────────────────────────────────────┘
               │
       ┌───────┴───────┬───────────┬──────────────┬─────────────┐
       │               │           │              │             │
       ▼               ▼           ▼              ▼             ▼
┌──────────────┐ ┌────────┐ ┌────────┐ ┌──────────────┐ ┌─────────────┐
│  Dashboard   │ │Profile │ │ Vitals │ │ Conditions   │ │Consultation │
│              │ │        │ │        │ │              │ │             │
│  Props:      │ │Props:  │ │Props:  │ │Props:        │ │Props:       │
│ • Insights   │ │ Profile│ │ Vitals │ │ • Medical    │ │ • Insights  │
│ • User Data  │ │ Update │ │ Update │ │ • Add/Remove │ │ • Data      │
│              │ │        │ │        │ │              │ │ • Profile   │
└──────────────┘ └────────┘ └────────┘ └──────────────┘ └─────────────┘
       │               │           │              │             │
       └───────┬───────┴───────────┴──────────────┴─────────────┘
               │
         Callbacks ▼
    (Dispatch changes back to App)
```

### Component Responsibilities

| Component      | Purpose                                      | Receives                | Sends Back               |
|----------------|----------------------------------------------|------------------------|--------------------------|
| **App.jsx**    | State holder, router, data coordinator      | -                      | -                        |
| **Layout**     | Navigation, page shell                       | -                      | -                        |
| **Dashboard**  | Display insights, risk assessments           | healthInsights, profile | -                        |
| **Profile**    | Edit demographics, lifestyle                 | userProfile            | onProfileUpdate(field, value) |
| **Vitals**     | Input vital signs and lab values             | latestVitals           | onVitalUpdate(data)      |
| **Conditions** | Manage medical history                       | medicalData            | onAddItem / onRemoveItem |
| **Consultation** | Query-based health advice                  | insights, data, profile | -                        |

## Key Design Patterns

### 1. **Lifting State Up**
- All health data lives in `App.jsx` via `useHealthData` hook
- Pages receive data as props (immutable downward flow)
- Pages call callbacks to update state (events bubble up)

### 2. **Composition Over Templates**
- No Django templates (`{% %}` syntax)
- React components compose into full UI
- Each page is an independent component

### 3. **Custom Hooks for Logic**
- `useHealthData` - encapsulates state & medical calculations
- Reusable across components
- Separates business logic from UI

### 4. **Separation of Concerns**
- **Components**: Presentational only (Layout, shared UIComponents)
- **Pages**: Page-level views (Dashboard, Profile, etc.)
- **Hooks**: State & logic (useHealthData)
- **Utils**: Pure functions (medicalKnowledge.js)
- **Services**: API communication (api.js)

## Django Backend Integration

Django serves as **API only**, not templating:

### Current Changes Needed
1. Add Django REST Framework or JSON endpoints
2. Update Django views to return JSON instead of rendered templates
3. Configure CORS for localhost:3000 (development)

### Example Django Endpoint Pattern
```python
# health/views.py
@csrf_exempt
@require_http_methods(["POST"])
def create_profile(request):
    data = json.loads(request.body)
    profile = HealthProfile.objects.create(**data)
    return JsonResponse(profile.to_dict())
```

### React API Usage
```javascript
// src/services/api.js
const response = await axios.post('/api/profile/', profileData);
```

## Component Composition Example

**Page Structure** (e.g., Profile page):

```jsx
export const Profile = ({ userProfile, onProfileUpdate }) => {
  const handleChange = (field, value) => {
    onProfileUpdate(field, value);  // Bubble up to App.jsx
  };

  return (
    <div className="row">
      <div className="col-lg-6">
        <Card title="Personal Information">
          <FormGroup
            label="Age"
            input={
              <input
                value={userProfile.age}
                onChange={(e) => handleChange('age', e.target.value)}
              />
            }
          />
        </Card>
      </div>
    </div>
  );
};
```

## Health Insights Calculation

Located in `useHealthData.js`:

```
Profile Data + Vital Signs
         ↓
  useHealthData Hook
         ↓
   useMemo (medicalKnowledge)
         ↓
┌─ Cardiovascular Risk Assessment
├─ Diabetic Risk Assessment
├─ Symptom Analyzer
└─ Overall Health Assessment
         ↓
   healthInsights (memoized)
         ↓
   Passed to Dashboard & Consultation pages
```

## Routing Map

```
/                  → Dashboard (overview)
/profile           → Profile (edit user info)
/vitals            → Vitals (vital signs input)
/conditions        → Conditions (medical history)
/consultation      → Consultation (AI advisor)
```

## Styling

- **Bootstrap 5** - via CDN in `index.html` (responsive utilities)
- **Lucide Icons** - npm package (card icons, nav icons)
- **Custom CSS** - `src/index.css` (animations, hover states)

## Development Workflow

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
Starts Vite at `http://localhost:3000`

### Build for Production
```bash
npm run build
```
Creates optimized bundle in `dist/`

### Backend Development
```bash
python manage.py runserver
```
Runs Django at `http://localhost:8000`

## Key Improvements Over Monolithic Template

| Aspect           | Old (Django Template) | New (React Components) |
|------------------|----------------------|----------------------|
| **File Size**    | 664 lines in 1 file  | 150-200 lines per component |
| **Reusability**  | Inline code          | Shared UIComponents, hooks |
| **Testing**      | Hard to unit test    | Each component testable |
| **State Flow**   | Implicit (template)  | Explicit (props, callbacks) |
| **Navigation**   | Page reload          | SPA routing (instant) |
| **Scaling**      | Difficult (monolith) | Easy (modular) |

## Next Steps

1. **Install dependencies**: `npm install`
2. **Update Django views** to return JSON endpoints
3. **Configure CORS** in Django settings
4. **Implement backend API** in `src/services/api.js`
5. **Add error handling** and loading states
6. **Connect to persistence** (save/load from backend)
7. **Add authentication** if needed
8. **Deploy**: Build React (`npm run build`), serve static files via Django

## Notes

- All data is currently in-memory; add persistence via Django API calls
- Medical knowledge is hardcoded in `medicalKnowledge.js`; move to database for scalability
- No authentication implemented; add session/token management
- Bootstrap responsive classes used throughout for mobile-friendly design
