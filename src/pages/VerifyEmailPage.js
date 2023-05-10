import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { Colors } from "../styles/theme";
import { FormContainer, FormHeader } from "../styles/form";
import { useValidatedInput } from "../hooks/useValidatedInput";
import useVerifyEmail from "../auth/useVerifyEmail";

const SIGN_UP_PASSWORD = "/signup/password";
// eslint-disable-next-line
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const SIGN_IN_ROUTE = "/login";

const VerifyEmailPage = () => {
  const emailRef = useRef();
  const navigate = useNavigate();

  const [helperText, setHelperText] = useState("");

  const {
    value: email,
    touched,
    attributes,
    isValid,
    isEmpty,
    contentError: notMatchRegex,
  } = useValidatedInput("", { required: true, matches: EMAIL_REGEX });

  const [verifyEmail, available, setAvailable] = useVerifyEmail();

  useEffect(() => {
    setAvailable(true);
    // eslint-disable-next-line
  }, [email]);

  useEffect(() => {
    if (isEmpty && touched) {
      setHelperText("This field is required");
    } else if (notMatchRegex && touched) {
      setHelperText("Invalid email address");
    } else if (!available) {
      setHelperText("This email already exists");
    } else setHelperText("");
  }, [isEmpty, touched, notMatchRegex, available]);

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyEmail(email);

    if (available) {
      localStorage.setItem("email", JSON.stringify(email));
      navigate(SIGN_UP_PASSWORD);
    }
  };

  const verifyForm = (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      noValidate
    >
      <TextField
        label="Email Address"
        name="email"
        type="email"
        ref={emailRef}
        {...attributes}
        error={touched && (!isValid || !available)}
        helperText={helperText}
        aria-invalid={isValid ? "false" : "true"}
        required
        autoComplete="off"
        variant="standard"
        fullWidth
      />

      <Button
        variant="contained"
        type="submit"
        color="primary"
        disabled={isValid ? false : true}
        sx={{ mt: 5, mb: 3 }}
      >
        Continue
      </Button>
    </Box>
  );

  const LinkToSignIn = (
    <Box sx={{ position: "absolute", bottom: "20px", left: "20px" }}>
      <Typography variant="body2" gutterBottom>
        Already have an account?
      </Typography>
      <Button
        variant="outlined"
        component={Link}
        to={SIGN_IN_ROUTE}
        // style={{ color: Colors.primary, textDecoration: "none" }}
      >
        Sign In
      </Button>
    </Box>
  );

  const regularHeader = (
    <FormHeader>
      <Avatar sx={{ p: "8px", mb: "20px", background: Colors.secondary }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h5">Verify your email</Typography>
    </FormHeader>
  );

  return (
    <FormContainer>
      {regularHeader}
      {verifyForm}
      {LinkToSignIn}
    </FormContainer>
  );
};

export default VerifyEmailPage;
