import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAuthStore from "../../auth/useAuth";
import AuthService from "../../api/services/AuthService";

const PersistLogin = () => {
  const authStore = useAuthStore();
  const accessToken = useAuthStore((state) => state.accessToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  useEffect(() => {
    let isMounted = true;

    const refreshAccess = async () => {
      try {
        const currentRefreshToken = localStorage.getItem("refresh");
        console.log("refreshAccess");
        console.log(currentRefreshToken);
        const res = await AuthService.refreshTokens(currentRefreshToken);
        setAccessToken(res.data?.access_token);
        localStorage.setItem("refresh", res.data?.refresh_token);
        return res.data?.access_token;
      } catch (err) {
        console.log(err);
        // authStore.setAccessToken(null);
        // authStore.setAuthUser(null);
        // localStorage.removeItem("refresh");
      }
    };

    const verifyRefreshToken = async () => {
      await refreshAccess();
      isMounted && authStore.setRequestLoading(true);
    };

    if (!accessToken) {
      verifyRefreshToken();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return <>{authStore.requestLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
