/**
 * main.jsx - React entry point
 * Renders App component into DOM root element
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log("Starting application...");

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log("Application started successfully.");
