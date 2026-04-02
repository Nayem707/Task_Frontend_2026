import axios from "axios";
import { TOKEN_KEY, ROUTES } from "../utils/constants";
import { getCookie, deleteCookie } from "../utils/cookies";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      deleteCookie(TOKEN_KEY);
      if (window.location.pathname !== ROUTES.LOGIN) {
        window.location.href = ROUTES.LOGIN;
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
