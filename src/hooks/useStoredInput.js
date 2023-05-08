import useLocalStorage from "./useLocalStorage";

const useStoredInput = (key, initialValue) => {
  const [value, setValue] = useLocalStorage(key, initialValue);

  const attributes = {
    value,
    onChange: (e) => {
      setValue(e.target.value);
    },
  };

  return [value, attributes];
};

export default useStoredInput;
