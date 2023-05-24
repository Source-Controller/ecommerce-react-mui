import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import AuthService from "../api/services/AuthService";

const useVerifyEmail = () => {
  const [available, setAvailable] = useState(true);

  const { mutate: verifyEmailMutation } = useMutation(
    (email) => AuthService.verifyEmail(email),
    {
      // onSuccess: (data) => {
      //   setAvailable(data.isAvailable);
      // },
    }
  );

  return [verifyEmailMutation, available, setAvailable];
};

export default useVerifyEmail;
