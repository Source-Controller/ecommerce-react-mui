import axios from "axios";
import useAuthStore from "../store/authStore";
import AuthService from "./services/AuthService";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const refreshAccess = async () => {
  try {
    const currentRefreshToken = localStorage.getItem("refresh");
    const res = await AuthService.refreshTokens(currentRefreshToken);
    const setAccessToken = useAuthStore.getState().setAccessToken;
    setAccessToken(res.data?.access_token);
    localStorage.setItem("refresh", res.data?.refresh_token);
    return res.data?.access_token;
  } catch {
    const signOut = useAuthStore.getState().signOut;
    signOut();
    localStorage.removeItem("refresh");
  }
};

const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },

  (error) => Promise.reject(error),
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;

    if (error?.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccess();
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosPrivate(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default axiosPublic;
export { axiosPrivate };
