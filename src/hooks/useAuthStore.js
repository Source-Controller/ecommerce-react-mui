import { useContext } from "react";

import AuthContext from "../context/auth";

const useAuthStore = () => {
  return useContext(AuthContext);
};

export default useAuthStore;
