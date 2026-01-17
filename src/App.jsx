/**
 * App.jsx - Main application component with routing
 * Manages: route definitions, shared state, page navigation
 * Data Flow: App holds state, passes to pages via props, pages communicate up via callbacks
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Vitals from './pages/Vitals';
import Conditions from './pages/Conditions';
import Consultation from './pages/Consultation';
import { useHealthData } from './hooks/useHealthData';

function App() {
  // Central state management for health data
  const {
    userProfile,
    medicalData,
    latestVitals,
    healthInsights,
    handleProfileUpdate,
    addMedicalItem,
    removeMedicalItem,
    addVital
  } = useHealthData();

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Dashboard Page */}
          <Route
            path="/"
            element={
              <Dashboard healthInsights={healthInsights} userProfile={userProfile} />
            }
          />

          {/* Profile Page */}
          <Route
            path="/profile"
            element={
              <Profile
                userProfile={userProfile}
                onProfileUpdate={handleProfileUpdate}
              />
            }
          />

          {/* Vitals Page */}
          <Route
            path="/vitals"
            element={
              <Vitals latestVitals={latestVitals} onVitalUpdate={addVital} />
            }
          />

          {/* Conditions Page */}
          <Route
            path="/conditions"
            element={
              <Conditions
                medicalData={medicalData}
                onAddItem={addMedicalItem}
                onRemoveItem={removeMedicalItem}
              />
            }
          />

          {/* Consultation Page */}
          <Route
            path="/consultation"
            element={
              <Consultation
                healthInsights={healthInsights}
                medicalData={medicalData}
                userProfile={userProfile}
                latestVitals={latestVitals}
              />
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
