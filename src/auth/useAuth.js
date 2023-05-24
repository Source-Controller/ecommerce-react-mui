import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

import AuthService from "../api/services/AuthService";
import useAuthStore from "../store/authStore";
import { handleRequestError } from "../utils/requestErrorHandler";

const USERS_KEY = "users";
const PROFILE_ROUTE = "/profile";

const useAuth = () => {
  const store = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || PROFILE_ROUTE;

  const signUpMutation = useMutation((userObj) => AuthService.signUp(userObj), {
    onMutate() {
      store.setRequestLoading(true);
    },
    onSuccess: () => {
      store.setRequestLoading(false);
      localStorage.removeItem("email");
      queryClient.invalidateQueries(USERS_KEY);
    },
    onError: (error) => {
      store.setRequestLoading(false);
      localStorage.removeItem("email");
      handleRequestError(error);
    },
  });

  const signInMutation = useMutation(
    ({ email, password }) => AuthService.signIn(email, password),
    {
      onMutate() {
        store.setRequestLoading(true);
      },
      onSuccess: (data) => {
        store.setRequestLoading(false);
        store.setAccessToken(data?.access_token);
        localStorage.setItem("refresh", data?.refresh_token);
        navigate(from, { replace: true });
      },
      onError: (error) => {
        store.setRequestLoading(false);
        handleRequestError(error);
      },
    }
  );

  return {
    signUpMutation,
    signInMutation,
  };
};

export default useAuth;
