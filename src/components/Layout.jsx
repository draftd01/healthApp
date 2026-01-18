/**
 * Layout component
 * Provides base structure with navigation and shared UI
 * Responsible for: navigation, app shell, responsive layout
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  FileText,
  Brain,
  User,
  Heart,
  MessageCircle,
  Activity
} from 'lucide-react';

export const Layout = ({ children }) => {

    const [currentView, setCurrentView] = React.useState('dashboard');
    const navigate = useNavigate();
    return (
    <div className="min-vh-100 d-flex flex-column">
      <div className="bg-white shadow border-bottom">
        <div className="container-fluid px-4 py-3">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <Brain className="text-primary me-3" size={32} />
              <div>
                <h1 className="fs-3 fw-bold text-dark">HealthAdvisor Pro</h1>
                <p className="fs-6 m-0 text-muted">Evidence-Based Clinical Decision Support</p>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center">
                <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '40px', height: '40px' }}>
                  <span className="text-white fw-bold">{'U'}</span>
                </div>
                <div className="fs-6">
                  <div className="fw-medium">{'User'}</div>
                  <div className="text-muted">Patient Profile</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white">
          <div className="max-w-7xl mx-auto px-6">
              <nav className="d-flex space-x-8">
              {[
                  { id: 'dashboard', label: 'Clinical Dashboard', icon: TrendingUp, path: '/dashboard' },
                  { id: 'profile', label: 'Patient Profile', icon: User, path: '/profile' },
                  { id: 'vitals', label: 'Labs & Vitals', icon: Activity, path: '/vitals' },
                  { id: 'conditions', label: 'Medical History', icon: FileText, path: '/conditions' },
                  { id: 'consultation', label: 'AI Consultation', icon: Brain, path: '/consultation' }
              ].map(nav => (
                  <button
                    type="button"
                    key={nav.id}
                    onClick={() => {
                      setCurrentView(nav.id);
                      navigate(nav.path);
                    }}
                    className={`border border-0 py-4 px-2 ms-4 bg-white fw-medium fs-6 d-flex align-items-center ${
                        currentView === nav.id
                        ? 'border-bottom border-primary border-2 text-primary'
                        : 'text-light-emphasis'// hover:text-emphasis'
                    }`}
                    >
                    <nav.icon className="mr-2" size={18} />
                    {nav.label}
                  </button>
              ))}
              </nav>
          </div>
      </div>
      {/* Header Navigation */}

      {/* Main Content */}
      <main className="flex-grow-1">
        <div className="container-fluid py-4">{children}</div>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p className="mb-0">
          HealthApp © 2026 - Your Personal Health Assistant
        </p>
      </footer>
    </div>);
};

export default Layout;
