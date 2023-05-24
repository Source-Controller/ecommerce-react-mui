import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import AuthService from "../api/services/AuthService";
import useAuthStore from "../hooks/useAuthStore";
const LOGIN_ROUTE = "/login";

const useRefreshToken = () => {
  const store = useAuthStore();
  const navigate = useNavigate();

  const { mutate: refreshAccess } = useMutation(
    () => AuthService.refreshTokens(localStorage.getItem("refresh")),
    {
      onSuccess: (data) => {
        store.setTokens({
          accessToken: data?.access_token,
          refreshToken: data?.refresh_token,
        });
        console.log("new tokens received", data);
      },
      onError: (error) => {
        navigate(LOGIN_ROUTE);
      },
    }
  );

  return refreshAccess;
};

export default useRefreshToken;
