import { useState } from "react";

const useShowPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = () => setShowPassword((show) => !show);

  return [showPassword, handleClickShowPassword, handleMouseDownPassword];
};

export default useShowPassword;
