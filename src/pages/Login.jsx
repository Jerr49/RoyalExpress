import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser } from "../api/User";
import { useNavigate } from "react-router-dom";
import RoyalLogo from "../assets/RoyalLogo.png";
import { useSnackbar } from "notistack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styles from "./Login.module.css";

// Validation Schema with Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const [, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    setError("");

    try {
      const response = await loginUser(values.email, values.password);
      localStorage.setItem("authToken", response.accessToken);
      enqueueSnackbar("Login successful!", { variant: "success" });

      // Navigate to /admin/products after successful login
      navigate("/admin/products");
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Invalid email or password");
      enqueueSnackbar("Login failed! Please check your email and password.", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["login-background"]}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: "16px",
          width: "100vw",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: { xs: "16px", sm: "24px" },
            borderRadius: "12px",
            boxShadow: 3,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            width: "100%",
            maxWidth: "400px",
            boxSizing: "border-box",
          }}
        >
          <img
            src={RoyalLogo}
            alt="Royal Express"
            style={{
              width: "120px",
              maxWidth: "100%",
              height: "auto",
            }}
          />
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
            Welcome Back!
          </Typography>
          <Typography
            variant="body1"
            fontSize="15px"
            sx={{ mb: 4, textAlign: "center" }}
          >
            Please enter your credentials to log in.
          </Typography>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form style={{ width: "100%" }}>
                <Box>
                  <Field
                    as={TextField}
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    required
                    variant="outlined"
                    helperText={<ErrorMessage name="email" />}
                    sx={{
                      mb: 2,
                      "& .MuiInputBase-root": {
                        borderRadius: "10px",
                        height: "50px",
                      },
                      "& .MuiInputBase-input": {
                        padding: "14px",
                      },
                    }}
                  />
                  <Field
                    as={TextField}
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    required
                    variant="outlined"
                    helperText={<ErrorMessage name="password" />}
                    sx={{
                      mb: 1,
                      "& .MuiInputBase-root": {
                        borderRadius: "10px",
                        height: "50px",
                      },
                      "& .MuiInputBase-input": {
                        padding: "14px",
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            sx={{
                              padding: "5px",
                              "& .MuiSvgIcon-root": { fontSize: "22px" },
                            }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Typography
                    variant="body1"
                    fontSize="12px"
                    fontFamily="monospace"
                    fontStyle="italic"
                    sx={{ mb: "20px" }}
                  >
                    Forgot your password?
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={isSubmitting || loading}
                    sx={{
                      borderRadius: "10px",
                      padding: "12px 0",
                      fontWeight: "bold",
                      height: "45px",
                      backgroundColor: "#00796b",
                      "&:hover": {
                        backgroundColor: "#004d40",
                      },
                    }}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
