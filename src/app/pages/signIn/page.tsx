"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import ForgotPassword from "./forgotPassword";
import { Box } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: "40px 30px 40px 30px",
  gap: theme.spacing(3),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  borderRadius: "10px",
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100%",
  padding: theme.spacing(4),
}));

const FormContainer = styled(Box)(({}) => ({
  display: "flex",
  flexDirection: "column",
  width: "90%",
  alignSelf: "center",
}));

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

export default function SignIn() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const StyledTypograghy = styled(Typography)(({}) => ({
    width: "100%",
    textAlign: "center",
    fontSize: "clamp(2rem, 10vw, 2.15rem)",
    fontWeight: "bold",
  }));
  const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    width: "100%",
    "&:hover": {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
      border: "1px solid black",
    },
  }));
  const router = useRouter();

  React.useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="));
    if (token) {
      router.push("/");
    }
  }, []);
  return (
    <Box>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <StyledTypograghy variant="h3">Sign in</StyledTypograghy>
          <Formik
            initialValues={{
              email: "",
              password: "",
              remember: false,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              const res = await fetch("/api/auth/signIn", {
                method: "POST",
                body: JSON.stringify({
                  email: values.email,
                  password: values.password,
                }),
              });
              if (res.ok) {
                router.push("/");
              }
            }}
          >
            {({ values, handleChange, handleSubmit, errors, touched }) => (
              <FormContainer component="form" onSubmit={handleSubmit} gap={3}>
                <FormControl>
                  <TextField
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    id="email"
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    // autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    name="password"
                    placeholder="••••••"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    required
                    fullWidth
                    variant="outlined"
                    value={values.password}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="remember"
                      color="primary"
                      checked={values.remember}
                      onChange={handleChange}
                    />
                  }
                  label="Remember me"
                />
                <ForgotPassword open={open} handleClose={handleClose} />
                <StyledButton type="submit" variant="outlined">
                  Sign in
                </StyledButton>
                <Link
                  component="button"
                  type="button"
                  onClick={handleClickOpen}
                  variant="body2"
                  sx={{ alignSelf: "center", mt: "5px" }}
                >
                  Forgot your password ?
                </Link>
                <Typography sx={{ textAlign: "center" }}>
                  New here?{" "}
                  <Link
                    href="/pages/signUp"
                    variant="body2"
                    sx={{ alignSelf: "center" }}
                  >
                    Sign Up
                  </Link>
                </Typography>
              </FormContainer>
            )}
          </Formik>
        </Card>
      </SignInContainer>
    </Box>
  );
}
