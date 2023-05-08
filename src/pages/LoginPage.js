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

import { Colors } from "../styles/theme";
import { FormHeader } from "../styles/form";
import useShowPassword from "../hooks/useShowPassword";
import useStoredInput from "../hooks/useStoredInput";
import useInput from "../hooks/useInput";
import useAuth from "../auth/useAuth";

const SIGN_UP_ROUTE = "/signup/email";

const SignIn = () => {
  const [email, emailAttributes] = useStoredInput("email", "");
  const [password, passwordAttributes] = useInput("");

  const [showPassword, handleClickShowPassword, handleMouseDownPassword] =
    useShowPassword();

  const { signInMutation } = useAuth();
  const { mutate: signIn, status, isError } = signInMutation;

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn({ email, password });
  };

  const signInForm = (
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
        {...emailAttributes}
        required
        autoComplete="off"
        variant="standard"
        fullWidth
      />
      <TextField
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        {...passwordAttributes}
        required
        variant="standard"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton
        variant="contained"
        type="submit"
        color="primary"
        loading={status === "loading"}
        disabled={!email || !password ? true : false}
        sx={{ mt: 0, mb: 5 }}
      >
        <span>Sign In</span>
      </LoadingButton>
    </Box>
  );

  const linkToSignUp = (
    <Box sx={{ position: "absolute", bottom: "20px", left: "20px" }}>
      <Typography variant="body2" gutterBottom>
        {`Don${"&apos;"}t have an account yet?`}
      </Typography>
      <Button variant="outlined" component={Link} to={SIGN_UP_ROUTE}>
        Sign Up
      </Button>
    </Box>
  );

  const errorHeader = (
    <FormHeader>
      <Avatar sx={{ p: "8px", mb: "20px", background: Colors.danger }}>
        <ErrorIcon />
      </Avatar>
    </FormHeader>
  );

  const regularHeader = (
    <FormHeader>
      <Avatar sx={{ p: "8px", mb: "20px", background: Colors.secondary }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h5">Sign In</Typography>
    </FormHeader>
  );

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "80vh" }}
    >
      <Paper
        sx={{
          height: "80%",
          width: "300px",
          padding: "20px",
          position: "relative",
        }}
        elevation={5}
      >
        {isError ? errorHeader : regularHeader}
        {signInForm}
        {linkToSignUp}
      </Paper>
    </Box>
  );
};

export default SignIn;
