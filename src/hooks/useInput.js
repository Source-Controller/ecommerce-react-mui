import { useState } from "react";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const reset = () => {
    setValue(initialValue);
  };

  const attributes = {
    value,
    onChange: (e) => {
      setValue(e.target.value);
    },
  };

  return [value, attributes, reset];
};

export default useInput;
