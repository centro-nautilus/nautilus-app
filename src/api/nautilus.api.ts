import axios from 'axios'
import { AuthStore } from '../auth/store/auth.store';

export const nautilusApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

nautilusApi.interceptors.request.use((config) => {
  const token = AuthStore.getState().token; 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});