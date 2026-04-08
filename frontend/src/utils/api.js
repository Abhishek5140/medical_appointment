import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Auth API
export const authAPI = {
  register: (data) => axios.post(`${API_URL}/auth/register`, data),
  login: (data) => axios.post(`${API_URL}/auth/login`, data),
  getMe: () => axios.get(`${API_URL}/auth/me`)
};

// Appointment API
export const appointmentAPI = {
  create: (data) => axios.post(`${API_URL}/appointments`, data),
  getAll: () => axios.get(`${API_URL}/appointments`),
  updateStatus: (id, status) => axios.put(`${API_URL}/appointments/${id}`, { status }),
  getDoctors: () => axios.get(`${API_URL}/appointments/doctors`),
  getDoctorsByDepartment: (department) => axios.get(`${API_URL}/appointments/doctors/${department}`)
};

export default {
  auth: authAPI,
  appointments: appointmentAPI
};
