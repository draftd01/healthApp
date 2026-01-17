/**
 * API service for Django backend communication
 * Handles all HTTP requests to the health backend
 */

import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const apiService = {
  // Profile endpoints
  createProfile: (data) => axios.post('/create-profile/', data),
  getProfile: (id) => axios.get(`/profile/${id}/`),
  updateProfile: (id, data) => axios.put(`/profile/${id}/`, data),

  // Medical data endpoints
  addCondition: (data) => axios.post('/conditions/', data),
  getConditions: () => axios.get('/conditions/'),
  deleteCondition: (id) => axios.delete(`/conditions/${id}/`),

  addMedication: (data) => axios.post('/medications/', data),
  getMedications: () => axios.get('/medications/'),
  deleteMedication: (id) => axios.delete(`/medications/${id}/`),

  addVital: (data) => axios.post('/vitals/', data),
  getVitals: () => axios.get('/vitals/'),

  addSymptom: (data) => axios.post('/symptoms/', data),
  getSymptoms: () => axios.get('/symptoms/'),
  deleteSymptom: (id) => axios.delete(`/symptoms/${id}/`),

  // Consultation endpoints
  generateConsultation: (query) => axios.post('/consultations/', { query }),
  getConsultations: () => axios.get('/consultations/'),

  // Health analysis endpoints
  getHealthInsights: () => axios.get('/health-insights/')
};

export default apiService;
