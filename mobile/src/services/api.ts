import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const BASE_URL = 'http://10.0.2.2:8084/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = (globalThis as any).__TOKEN__;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear token
      (globalThis as any).__TOKEN__ = null;
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authApi = {
  register: (data: { email: string; password: string; displayName: string }) =>
    api.post('/auth/register', data),
  authenticate: (data: { email: string; password: string }) =>
    api.post('/auth/authenticate', data),
};

// Programs endpoints
export const programsApi = {
  getAll: () => api.get('/programs'),
  getToday: () => api.get('/programs/today'),
  create: (data: any) => api.post('/programs', data),
  getById: (id: string) => api.get(`/programs/${id}`),
};

// Tracking endpoints
export const trackingApi = {
  startSession: (data: { exerciseName: string; muscleGroup: string }) =>
    api.post('/tracking/start', data),
  logSet: (data: {
    setNumber: number;
    targetReps: number;
    actualReps: number;
    targetWeight: number;
    actualWeight: number;
  }) => api.post('/tracking/set', data),
  endSession: () => api.post('/tracking/end'),
};

// Set global token
export const setAuthToken = (token: string | null) => {
  (globalThis as any).__TOKEN__ = token;
};

export default api;