import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useAuthStore from "../hooks/useAuthStore";
import useRefreshToken from "../hooks/useRefreshToken";

const useAxiosPrivate = () => {
  const store = useAuthStore();
  const refreshAccess = useRefreshToken();
  const currentAccessToken = store.accessToken;

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${currentAccessToken}`;
        config.headers["Content-Type"] = "application/json";
        return config;
      },

      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
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
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [currentAccessToken, refreshAccess]);

  return axiosPrivate;
};

export default useAxiosPrivate;
