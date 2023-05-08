import { useState, useEffect } from "react";

const useValidation = (value, validations) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "required":
          setIsEmpty(!value);
          break;
        case "minLength":
          setMinLengthError(value.length < validations[validation]);
          break;
        case "matches":
          if (validations[validation] instanceof RegExp) {
            setContentError(!validations[validation].test(value));
            break;
          }
          if (typeof validations[validation] === "string") {
            setContentError(validations[validation] !== value);
            break;
          }
          break;
        default:
      }
    }
  }, [value, validations]);

  useEffect(() => {
    if (isEmpty || minLengthError || contentError) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [isEmpty, minLengthError, contentError]);

  return {
    isEmpty,
    isValid,
    minLengthError,
    contentError,
  };
};

export const useValidatedInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [touched, setTouched] = useState(false);
  const [inFocus, setInFocus] = useState(false);

  const validation = useValidation(value, validations);

  const attributes = {
    value,
    onChange: (e) => {
      setValue(e.target.value);
    },
    onFocus: () => {
      setInFocus(true);
    },
    onBlur: () => {
      setTouched(true);
      setInFocus(false);
    },
  };

  const reset = () => {
    setValue("");
  };

  return {
    value,
    reset,
    touched,
    inFocus,
    attributes,
    ...validation,
  };
};
