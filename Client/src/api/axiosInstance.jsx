// src/api/axiosInstance.js
import axios from "axios";

// ✅ Base URL: Use environment variable if set, otherwise fallback to localhost
const baseURL = import.meta.env.VITE_BACKEND_URL
  ? `${import.meta.env.VITE_BACKEND_URL}/api`
  : "http://localhost:4000/api";

const axiosInstance = axios.create({
  baseURL,
  // Optional: Send credentials (cookies) if your backend uses them
  withCredentials: true,
});

// ✅ Interceptor to attach token from localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Optional: Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // For debugging, you can log the error
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;