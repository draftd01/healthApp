# Project Structure Visualization

## Directory Tree

```
HealthApp/
│
├── 📄 public/
│   └── index.html                 # Single HTML mount point (React root)
│
├── 📂 src/
│   ├── main.jsx                   # React entry point
│   ├── App.jsx                    # Main app (router + state)
│   ├── index.css                  # Global styles
│   │
│   ├── 📂 components/             # Reusable UI components
│   │   ├── Layout.jsx             # Navigation + page wrapper
│   │   └── 📂 shared/
│   │       └── UIComponents.jsx   # Card, Alert, FormGroup, Lists
│   │
│   ├── 📂 pages/                  # Full-page components (routes)
│   │   ├── Dashboard.jsx          # / → Health overview
│   │   ├── Profile.jsx            # /profile → User info
│   │   ├── Vitals.jsx             # /vitals → Vital signs
│   │   ├── Conditions.jsx         # /conditions → Medical history
│   │   └── Consultation.jsx       # /consultation → AI advisor
│   │
│   ├── 📂 hooks/                  # Custom React hooks
│   │   └── useHealthData.js       # Central state management
│   │
│   ├── 📂 services/               # API communication
│   │   └── api.js                 # Django backend client
│   │
│   └── 📂 utils/                  # Utilities & logic
│       └── medicalKnowledge.js    # Medical assessment algorithms
│
├── 📂 health/                     # Django app (existing)
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   └── ...
│
├── 📂 healthapp/                  # Django project settings
│   ├── settings.py
│   ├── urls.py
│   └── ...
│
├── 📂 templates/                  # Old Django templates (DEPRECATED)
│   └── health/
│       ├── index.html             # ← Replaced by React
│       ├── profile.html
│       ├── test.html
│       └── vitals.html
│
├── 📄 package.json                # npm dependencies (React, Vite, etc.)
├── 📄 vite.config.js              # Vite build configuration
├── 📄 requirements.txt            # Python dependencies
├── 📄 manage.py                   # Django CLI
│
├── 📄 REFACTOR_SUMMARY.md         # This refactor overview
├── 📄 REACT_ARCHITECTURE.md       # Detailed architecture guide
├── 📄 QUICKSTART.md               # Developer quick start
└── 📄 README.md                   # Original project README
```

## Component Hierarchy

```
App
├── Layout
│   ├── Navigation Bar
│   │   ├── Home Link
│   │   ├── Profile Link
│   │   ├── Vitals Link
│   │   ├── Conditions Link
│   │   └── Consultation Link
│   │
│   ├── Route Component (dynamic)
│   │   ├── Dashboard
│   │   │   ├── Card (Overall Assessment)
│   │   │   ├── Card (Quick Stats)
│   │   │   ├── Card (Cardiovascular Risk)
│   │   │   ├── Card (Diabetic Risk)
│   │   │   └── Card (Symptom Analysis)
│   │   │
│   │   ├── Profile
│   │   │   ├── Card (Personal Information)
│   │   │   │   ├── FormGroup (Initials)
│   │   │   │   ├── FormGroup (Age)
│   │   │   │   └── FormGroup (Gender)
│   │   │   ├── Card (Physical Measurements)
│   │   │   │   ├── FormGroup (Height)
│   │   │   │   ├── FormGroup (Weight)
│   │   │   │   └── Alert (BMI)
│   │   │   ├── Card (Lifestyle Information)
│   │   │   └── Card (Family History)
│   │   │
│   │   ├── Vitals
│   │   │   ├── Card (Cardiovascular Vitals)
│   │   │   │   ├── VitalInput (Blood Pressure)
│   │   │   │   ├── VitalInput (Heart Rate)
│   │   │   │   └── ...
│   │   │   ├── Card (Metabolic Labs)
│   │   │   ├── Card (Renal Function)
│   │   │   └── Alert (Reference Ranges)
│   │   │
│   │   ├── Conditions
│   │   │   ├── Card (Medical Conditions)
│   │   │   │   ├── FormGroup + Button (Add)
│   │   │   │   └── MedicalItemList
│   │   │   ├── Card (Medications)
│   │   │   ├── Card (Allergies)
│   │   │   ├── Card (Previous Surgeries)
│   │   │   └── Card (Medical Summary)
│   │   │
│   │   └── Consultation
│   │       ├── Card (Query Input)
│   │       ├── Card (Clinical Analysis)
│   │       ├── Card (Differential Diagnosis)
│   │       ├── Card (Recommended Tests)
│   │       ├── Card (Treatment Options)
│   │       └── Alert (Follow-up Guidance)
│   │
│   └── Footer
│
└── Router (React Router)
    └── Route definitions
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      App.jsx                                │
│  ╔═════════════════════════════════════════════════════╗   │
│  ║         useHealthData() hook                        ║   │
│  ║                                                      ║   │
│  ║  State:                                              ║   │
│  ║  • userProfile (age, gender, height, weight...)    ║   │
│  ║  • medicalData (conditions, meds, allergies...)    ║   │
│  ║  • latestVitals (BP, HR, labs...)                  ║   │
│  ║  • healthInsights (calculated from above)          ║   │
│  ║                                                      ║   │
│  ║  Callback functions:                                 ║   │
│  ║  • handleProfileUpdate(field, value)                ║   │
│  ║  • addMedicalItem(category, item)                   ║   │
│  ║  • removeMedicalItem(category, id)                  ║   │
│  ║  • addVital(vitalData)                              ║   │
│  ╚═════════════════════════════════════════════════════╝   │
│                                                              │
│         Props passed down ↓                                │
└──────────────────────────┬──────────────────────────────────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
         ▼                 ▼                 ▼
   ┌──────────┐    ┌─────────┐    ┌──────────────────┐
   │Dashboard │    │ Profile │    │ Consultation     │
   │          │    │         │    │                  │
   │Props:    │    │Props:   │    │Props:            │
   │•Insights │    │•Profile │    │•insights         │
   │•Profile  │    │•Callback│    │•medicalData      │
   │          │    │         │    │•userProfile      │
   └──────────┘    └────┬────┘    │•latestVitals     │
                        │         │                  │
                        │         │State (local):    │
                    User edits ─→ │consultations []  │
                        │         │query string      │
                        ▼         │                  │
                  onProfileUpdate │                  │
                        │         │                  │
                        └────┬────┴──────────────────┘
                             │
                   Bubbles up ↓
                             │
                  App state updated
                             │
                        ▼    │    ▼
                  Re-render affected pages
                  Insights recalculated
                  UI updates instantly
```

## State Management Flow

```
┌─ Initial State
│  {
│    userProfile: { age, gender, height, weight, ... }
│    medicalData: { conditions: [], medications: [], ... }
│    latestVitals: { systolicBP, diastolicBP, ... }
│  }
│
├─ Computed (useMemo)
│  healthInsights = {
│    cardiovascularRisk: { riskLevel, riskScore, riskFactors },
│    diabeticRisk: { status, riskFactors, recommendations },
│    symptomAnalyses: [],
│    overallAssessment: string
│  }
│
├─ User Action
│  │ Profile: input age → onProfileUpdate('age', 45)
│  │ Vitals: input BP → onVitalUpdate({ systolicBP: 140 })
│  │ Conditions: click Add → onAddItem('conditions', 'Diabetes')
│  │
│  └─→ Callback fired
│
├─ Update in App
│  setUserProfile(prev => ({ ...prev, age: 45 }))
│  setLatestVitals(prev => ({ ...prev, systolicBP: 140 }))
│  setMedicalData(prev => ({ ...prev, conditions: [...] }))
│
├─ Recalculate
│  useMemo detects dependencies changed
│  medicalKnowledge.cardiovascularRisk.assessRisk() runs
│  healthInsights updated
│
└─ Re-render
   Dashboard sees new healthInsights
   Profile sees updated userProfile
   All affected components update
```

## Routing Map

```
URL                  Component           Purpose
─────────────────────────────────────────────────────
/                  → Dashboard         Health overview, insights
/profile           → Profile           Edit user demographics
/vitals            → Vitals            Input vital signs
/conditions        → Conditions        Manage medical history
/consultation      → Consultation      AI health advisor
```

## File Import Dependencies

```
App.jsx
├─ Dashboard.jsx
├─ Profile.jsx
├─ Vitals.jsx
├─ Conditions.jsx
├─ Consultation.jsx
├─ Layout.jsx
└─ useHealthData.js
   ├─ medicalKnowledge.js
   └─ React hooks (useState, useMemo)

Pages (Dashboard, Profile, etc.)
├─ UIComponents.jsx (Card, Alert, FormGroup, etc.)
├─ React (useState, etc.)
├─ lucide-react (icons)
└─ useHealthData hook (for some pages)

Layout.jsx
├─ react-router-dom (Link)
├─ lucide-react (icons)
└─ UIComponents.jsx

useHealthData.js
├─ React (useState, useMemo)
└─ medicalKnowledge.js

api.js
├─ axios (HTTP client)
└─ React (hooks if used as service)

medicalKnowledge.js
└─ Pure functions (no dependencies)
```

## Technology Stack

```
Frontend
├─ React 18              Main UI library
├─ React Router v6       Client-side routing (SPA)
├─ Vite                  Build tool & dev server
├─ Bootstrap 5           CSS framework (CDN)
├─ Lucide React          Icons
└─ Axios                 HTTP client

Backend
├─ Django                Web framework
├─ Python                Language
└─ SQLite (default)      Database

Development
├─ Node.js / npm         Package manager
├─ ESLint                Code quality
└─ Git                   Version control
```

## Build Process

```
Development (npm run dev)
├─ Vite starts dev server on :3000
├─ Hot module replacement (HMR)
├─ Fast refresh on file changes
└─ Proxy requests to Django API on :8000

Production (npm run build)
├─ Vite bundles React code
├─ Minifies and optimizes
├─ Creates dist/ folder
├─ Ready to serve via Django static files
└─ Python manage.py collectstatic
```

## Key Design Patterns

```
Pattern               Location            Purpose
─────────────────────────────────────────────────────
Custom Hook          useHealthData.js     State management
Component Comp.      UIComponents.jsx     Reusable elements
Props Down,          App → Pages          Unidirectional flow
Callbacks Up
Memoization          useHealthData.js     Optimize insights
Lazy Evaluation      medicalKnowledge.js  On-demand analysis
Render Props         N/A                  (Could add later)
Context API          N/A                  (Future: global theme)
```

## Performance Notes

```
Optimizations implemented:
├─ useMemo for healthInsights calculation
├─ Component composition reduces re-renders
├─ Vite code splitting (lazy routes optional)
└─ Bootstrap CSS via CDN (not bundled)

Future optimizations:
├─ React.memo for page components
├─ Lazy loading with React.lazy()
├─ Suspense boundaries
└─ Context API to avoid prop drilling
```
