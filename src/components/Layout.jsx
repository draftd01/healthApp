/**
 * Layout component
 * Provides base structure with navigation and shared UI
 * Responsible for: navigation, app shell, responsive layout
 */

import React from 'react';
import { Link } from 'react-router-dom';
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
    return (
    <div className="min-vh-100 d-flex flex-column">
        {/* Navigation */}
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <nav className="d-flex space-x-8">
                {[
                    { id: 'dashboard', label: 'Clinical Dashboard', icon: TrendingUp },
                    { id: 'profile', label: 'Patient Profile', icon: User },
                    { id: 'vitals', label: 'Labs & Vitals', icon: Activity },
                    { id: 'conditions', label: 'Medical History', icon: FileText },
                    { id: 'consultation', label: 'AI Consultation', icon: Brain }
                ].map(nav => (
                    <button
                    type="button"
                    key={nav.id}
                    onClick={() => setCurrentView(nav.id)}
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
        {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand fw-bold">
            <Heart className="me-2" size={24} />
            HealthApp
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto gap-2">
              <li className="nav-item">
                <Link to="/" className="nav-link d-flex align-items-center gap-2">
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-link d-flex align-items-center gap-2">
                  <User size={18} />
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/vitals" className="nav-link d-flex align-items-center gap-2">
                  <Activity size={18} />
                  Vitals
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/conditions" className="nav-link d-flex align-items-center gap-2">
                  <Heart size={18} />
                  Conditions
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/consultation" className="nav-link d-flex align-items-center gap-2">
                  <MessageCircle size={18} />
                  Consultation
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}

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
