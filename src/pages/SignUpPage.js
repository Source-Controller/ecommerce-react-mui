import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import {
  FormHeader,
  NotificationBlock,
  NotificationtText,
  NotificationIcon,
} from "../styles/form";
import { Colors } from "../styles/theme";
import { useValidatedInput } from "../hooks/useValidatedInput";
import useShowPassword from "../hooks/useShowPassword";
import useAuth from "../auth/useAuth";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const SIGN_IN_ROUTE = "/login";
const VERIFY_EMAIL_ROUTE = "/signup/email";

const SignUpPage = () => {
  const [showPassword, onClickPassword, onMouseDownPassword] =
    useShowPassword();

  const [showMatchPassword, onClickMatchPassword, onMouseDownMatchPassword] =
    useShowPassword();

  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();

  const {
    value: username,
    reset: resetUsername,
    touched: touchedUsername,
    attributes: usernameAttributes,
    isValid: isUsernameValid,
    isEmpty: isUsernameEmpty,
  } = useValidatedInput("", { required: true });

  const {
    value: password,
    reset: resetPassword,
    touched: touchedPassword,
    inFocus: passwordInFocus,
    attributes: passwordAttributes,
    isValid: isPasswordValid,
    isEmpty: isPasswordEmpty,
    minLengthError: passwordTooShort,
    contentError: notPassword,
  } = useValidatedInput("", {
    required: true,
    minLength: 8,
    matches: PASSWORD_REGEX,
  });

  const {
    value: matchPassword,
    reset: resetMatchPassword,
    touched: touchedMatchPassword,
    attributes: matchPasswordAttributes,
    isValid: isMatchPasswordValid,
    isEmpty: isMatchPasswordEmpty,
    contentError: notMatchPassword,
  } = useValidatedInput("", {
    required: true,
    matches: password,
  });

  const resetFormValues = () => {
    resetUsername();
    resetPassword();
    resetMatchPassword();
  };

  const verifiedEmail = JSON.parse(localStorage.getItem("email"));

  const { signUpMutation } = useAuth();
  const { mutate: signUp, status, error } = signUpMutation;

  useEffect(() => {
    if (status === "error") {
      setErrMsg(error.message);
      errRef.current?.focus();
    }
  }, [status, error]);

  useEffect(() => {
    setErrMsg("");
  }, [password, matchPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      email: verifiedEmail,
      avatar: "https://picsum.photos/640",
      name: username,
      password: password,
    };

    signUp(newUser);
    if (status === "success") {
      resetFormValues();
    }
  };

  const signUpForm = (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      rowGap="15px"
      flexDirection="column"
      alignItems="center"
      noValidate
    >
      <TextField
        label="Email Address"
        name="email"
        type="email"
        value={verifiedEmail}
        disabled
        variant="standard"
        fullWidth
      />
      <TextField
        label="Name"
        name="username"
        {...usernameAttributes}
        error={touchedUsername && !isUsernameValid}
        helperText={
          isUsernameEmpty && touchedUsername ? "This field is required" : ""
        }
        aria-invalid={isUsernameValid ? "false" : "true"}
        required
        autoFocus
        autoComplete="off"
        variant="standard"
        fullWidth
      />
      <TextField
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        {...passwordAttributes}
        error={touchedPassword && !isPasswordValid}
        helperText={
          isPasswordEmpty && touchedPassword
            ? "This field is required"
            : passwordTooShort && touchedPassword
            ? "Minimum password length is 8 characters"
            : notPassword && touchedPassword
            ? "Invalid password"
            : ""
        }
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={onClickPassword}
                onMouseDown={onMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        aria-invalid={isPasswordValid ? "false" : "true"}
        aria-describedby="passwordnotxe"
        variant="standard"
        fullWidth
      />
      <NotificationBlock
        id="passwordnote"
        show={passwordInFocus && !isPasswordValid}
      >
        <NotificationIcon />
        <NotificationtText>
          Must be at least 8 characters long.
        </NotificationtText>
        <NotificationtText>
          Must include uppercase and lowercase letters and a number.
        </NotificationtText>
      </NotificationBlock>
      <TextField
        label="Confirmation password"
        name="password"
        type={showMatchPassword ? "text" : "password"}
        {...matchPasswordAttributes}
        error={touchedMatchPassword && !isMatchPasswordValid}
        helperText={
          isMatchPasswordEmpty && touchedMatchPassword
            ? "This field is required"
            : notMatchPassword && touchedMatchPassword
            ? "Passwords don't match"
            : ""
        }
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={onClickMatchPassword}
                onMouseDown={onMouseDownMatchPassword}
                edge="end"
              >
                {showMatchPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        aria-invalid={isMatchPasswordValid ? "false" : "true"}
        fullWidth
        variant="standard"
      />
      <LoadingButton
        variant="contained"
        type="submit"
        color="primary"
        loading={status === "loading"}
        disabled={!isPasswordValid || !isMatchPasswordValid ? true : false}
        sx={{ mt: 0, mb: 5 }}
      >
        <span>Sign Up</span>
      </LoadingButton>
    </Box>
  );

  const BackButton = (
    <Box sx={{ position: "absolute", bottom: "20px", left: "20px" }}>
      <Button
        variant="outlined"
        component={Link}
        to={VERIFY_EMAIL_ROUTE}
        // style={{ color: Colors.primary, textDecoration: "none" }}
      >
        Back
      </Button>
    </Box>
  );

  const SuccessHeader = (
    <FormHeader>
      <Avatar sx={{ p: "8px", mb: "20px", background: Colors.success }}>
        <CheckCircleIcon />
      </Avatar>
      <Typography variant="h5">Success!</Typography>
      <Button variant="outlined" sx={{ marginTop: "40px" }}>
        <Link
          to={SIGN_IN_ROUTE}
          style={{ color: Colors.primary, textDecoration: "none" }}
        >
          Sign In
        </Link>
      </Button>
    </FormHeader>
  );

  const RegularHeader = (
    <FormHeader>
      <Avatar sx={{ p: "8px", mb: "20px", background: Colors.secondary }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h5">Sign Up</Typography>
    </FormHeader>
  );

  const ErrorHeader = (
    <FormHeader>
      <Avatar sx={{ p: "8px", mb: "20px", background: Colors.danger }}>
        <ErrorIcon />
      </Avatar>
      <Typography ref={errRef} variant="h5" aria-live="assertive" autoFocus>
        {errMsg}
      </Typography>
    </FormHeader>
  );

  const content =
    status === "success" ? (
      SuccessHeader
    ) : (
      <>
        {errMsg ? ErrorHeader : RegularHeader}
        {signUpForm}
        {BackButton}
      </>
    );

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Paper
        sx={{
          minHeight: "450px",
          width: "300px",
          padding: "20px",
          margin: "50px auto",
          position: "relative",
        }}
        elevation={5}
      >
        {content}
      </Paper>
    </Box>
  );
};

export default SignUpPage;
