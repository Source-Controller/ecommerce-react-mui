import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import AuthService from "../api/services/AuthService";
import useAuthStore from "../hooks/useAuthStore";

const WELCOME_ROUTE = "/welcome";

const useLogin = () => {
  const store = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || WELCOME_ROUTE;

  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();

  const { mutate: loginMutation } = useMutation(
    ({ email, password }) => AuthService.signIn(email, password),
    {
      onSuccess: (data) => {
        store.setTokens({
          accessToken: data?.access_token,
          refreshToken: data?.refresh_token,
        });
        navigate(from, { replace: true });
      },
      onError: (error) => {
        setErrMsg(error?.response?.data?.message);
        errRef.current?.focus();
      },
    }
  );

  return [loginMutation, errMsg, setErrMsg, errRef];
};

export default useLogin;
