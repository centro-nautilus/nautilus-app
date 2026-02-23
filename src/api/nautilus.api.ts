import axios from 'axios';
import { AuthStore } from '../auth/store/auth.store';
import { isTokenExpired } from '../utils/isTokenExpired';


export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

export const nautilusApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

// REQUEST → agregar access token
nautilusApi.interceptors.request.use(async (config) => {
  const { token, setToken, logout } = AuthStore.getState();
  if (token) {
    const isExpired = isTokenExpired(token)
    if (isExpired) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {}, { withCredentials: true })
        const newAccessToken = response.data.token
        setToken(newAccessToken)
        config.headers.Authorization = `Bearer ${newAccessToken}`;
      } catch (err) {
        logout()
        return Promise.reject(err);
      }
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});


