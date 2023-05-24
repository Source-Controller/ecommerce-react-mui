import { useEffect } from "react";
import { axiosPrivate } from "./axios";
import useRefreshToken from "../auth/useRefreshToken";
import useAuth from "../hooks/useAuth";

const useAxiosPrivate = () => {
  const refreshAccess = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = refreshAccess();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refreshAccess]);

  return axiosPrivate;
};

export default useAxiosPrivate;
