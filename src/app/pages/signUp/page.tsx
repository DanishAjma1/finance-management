"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { Grid2 } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "90%",
  padding: "40px 30px 40px 30px",
  gap: theme.spacing(3),
  justifyContent: "center",
  textAlign: "center",

  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  borderRadius: "10px",
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  // minHeight: "70%",
  padding: theme.spacing(4),
  flexDirection: "column",
  justifyContent: "space-between",
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
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function SignUp() {
  return (
    <Grid2>
      <CssBaseline enableColorScheme />
      <SignUpContainer>
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h3"
            sx={{
              width: "100%",
              textAlign: "center",
              fontSize: "clamp(2rem, 10vw, 2.15rem)",
              fontWeight: "bold",
            }}
          >
            Sign Up
          </Typography>
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
              remember: false,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {

              const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ data: values }),
              });
            
              if (response.ok) {
                window.location.href = "/";
              } else {
                const errorData = await response.json();
                alert("Something went wrong!");
              }
            }}
          >
            {({ values, handleChange, handleSubmit, errors, touched }) => (
              <FormContainer component="form" onSubmit={handleSubmit} gap={2}>
                <TextField
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  id="email"
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  value={values.email}
                  onChange={handleChange}
                />
                <TextField
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  id="password"
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="••••••"
                  autoComplete="current-password"
                  required
                  fullWidth
                  variant="outlined"
                  value={values.password}
                  onChange={handleChange}
                />
                <TextField
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••"
                  autoComplete="confirm-password"
                  required
                  fullWidth
                  variant="outlined"
                  value={values.confirmPassword}
                  onChange={handleChange}
                />
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: "black",
                  }}
                >
                  Sign Up
                </Button>
                <Typography sx={{ textAlign: "center" }}>
                  Already have an account?{" "}
                  <Link
                    href="/pages/signIn"
                    variant="body2"
                    sx={{ alignSelf: "center" }}
                  >
                    Sign in
                  </Link>
                </Typography>
              </FormContainer>
            )}
          </Formik>
        </Card>
      </SignUpContainer>
    </Grid2>
  );
}
