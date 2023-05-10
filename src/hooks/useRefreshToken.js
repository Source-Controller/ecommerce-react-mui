import AuthService from "../api/services/AuthService";
import useAuthStore from "../store/authStore";

const useRefreshToken = () => {
  const store = useAuthStore();
  const currentRefreshToken = localStorage.getItem("refresh");

  const refreshAccess = async () => {
    try {
      const res = await AuthService.refreshTokens(currentRefreshToken);
      store.setAccessToken(res.data?.access_token);
      localStorage.setItem("refresh", res.data?.refresh_token);
      return res.data?.access_token;
    } catch {
      store.signOut();
      localStorage.removeItem("refresh");
    }
  };
  return refreshAccess;
};

export default useRefreshToken;
