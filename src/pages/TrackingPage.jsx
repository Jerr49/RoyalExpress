import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { Outlet, useNavigate } from "react-router-dom";
import { getProductsByTrackingId } from "../api/Product";
import {
  Box,
  TextField,
  Button,
  Alert,
  Grid,
  Typography,
  Container,
  Link,
  IconButton,
  Paper,
  CircularProgress, // Import CircularProgress for the loader
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RoyalLogo from "../assets/RoyalLogo.png";
import DeliveryImage1 from "../assets/deliveryImage1.jpeg";
import DeliveryImage2 from "../assets/deliveryImage2.jpeg";
import DeliveryImage3 from "../assets/deliveryImage3.jpg";
import DeliveryImage4 from "../assets/deliveryImage4.jpeg";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import SuccessRate from "./SuccessRate";

// ✅ Define Validation Schema using Yup
const trackingSchema = yup.object().shape({
  trackingId: yup
    .string()
    .required("Tracking ID is required")
  
});

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const TrackingPage = () => {
  const [notFoundError, setNotFoundError] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(trackingSchema),
  });

  const handleTrack = async (data) => {
    setNotFoundError("");
    setLoading(true);

    setTimeout(async () => {
      try {
        const product = await getProductsByTrackingId(data.trackingId);
        console.log("Product found:", product);

        if (product) {
          navigate("/tracking-details", { state: { productDetails: product } });
          enqueueSnackbar("Product tracked Successfully!", {
            variant: "success",
          });
        } else {
          setNotFoundError(
            "No product found. Please check the Tracking ID and try again."
          );
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        setNotFoundError(
          error.message || "Failed to fetch product details. Please try again."
        );
        enqueueSnackbar(error.message, { variant: "error" });
      } finally {
        setLoading(false); 
      }
    }, 2000); 
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f5f5f5",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          py: { xs: 4, md: 8 },
          background: "#FFFFFF",
          color: "#000000",
        }}
      >
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <img
              src={RoyalLogo}
              alt="Royal Logo"
              style={{ width: "300px", maxWidth: "90%", marginTop: "-3rem" }}
            />
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: "bold", fontSize: { xs: "2rem", md: "3rem" } }}
            >
              Track Your Shipment
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: "1rem", md: "1.1rem" }, mb: 4 }}
            >
              Enter your tracking ID below to get real-time updates on your
              shipment.
            </Typography>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <Paper
              elevation={3}
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: 2,
                maxWidth: "600px",
                mx: "auto",
                background: "#FFFFFF",
              }}
            >
              <form onSubmit={handleSubmit(handleTrack)}>
                <Controller
                  name="trackingId"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder="Enter Tracking ID"
                      fullWidth
                      error={!!errors.trackingId}
                      helperText={errors.trackingId?.message}
                      sx={{
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          "& fieldset": {
                            borderColor: "#e0e0e0",
                          },
                          "&:hover fieldset": {
                            borderColor: "#002366",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#002366",
                          },
                        },
                        "& .MuiInputBase-input": {
                          fontSize: { xs: "1rem", md: "1.2rem" },
                          padding: "12px",
                        },
                      }}
                      size="small"
                    />
                  )}
                />

                {notFoundError && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {notFoundError}
                  </Alert>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                  sx={{
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    padding: "12px 24px",
                    width: "100%",
                    maxWidth: "350px",
                    borderRadius: 2,
                    background: "linear-gradient(135deg, #002366, #001A4D)",
                    color: "#FFFFFF",
                    "&:hover": {
                      background: "linear-gradient(135deg, #001A4D, #002366)",
                    },
                    boxShadow: "0px 4px 10px rgba(0, 35, 102, 0.3)",
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "#FFFFFF" }} /> 
                  ) : (
                    "Track"
                  )}
                </Button>
              </form>
            </Paper>
          </motion.div>
        </Container>
      </Box>

    {/* Image Gallery Section */}
    <Container sx={{ py: { xs: 4, md: 6 } }}> 
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: "bold", textAlign: "center", fontSize: { xs: "1.75rem", md: "2.125rem" } }} // Reduce font size on mobile
            >
              Our Delivery Services
            </Typography>
          </motion.div>
          <Grid container spacing={4} justifyContent="center">
            {[DeliveryImage1, DeliveryImage2, DeliveryImage3, DeliveryImage4].map((image, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div variants={fadeInUp}>
                  <img
                    src={image}
                    alt={`Delivery Service ${index + 1}`}
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* About Us Section */}
      <Container sx={{ py: { xs: 4, md: 6 } }}> 
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div variants={fadeInUp}>
                <img
                  src="https://via.placeholder.com/600x400" 
                  alt="Delivery Illustration"
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div variants={fadeInUp}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ fontWeight: "bold", fontSize: { xs: "1.75rem", md: "2.125rem" } }} // Reduce font size on mobile
                >
                  About Us
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, fontSize: { xs: "0.9rem", md: "1rem" } }}> {/* Reduce font size on mobile */}
                  At Royal Express Delivery, we are committed to providing fast, reliable,
                  and secure delivery services nationwide. With years of experience,
                  we ensure your packages are delivered on time, every time.
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, fontSize: { xs: "0.9rem", md: "1rem" } }}> {/* Reduce font size on mobile */}
                  Our mission is to make shipping easy and affordable for everyone.
                  Whether you're sending a small package or a large shipment, we've
                  got you covered.
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>

      {/* Delivery Rates Section */}
      <Box sx={{ py: { xs: 4, md: 6 }, background: "#FFFFFF" }}> 
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: "bold", textAlign: "center", fontSize: { xs: "1.75rem", md: "2.125rem" } }} // Reduce font size on mobile
              >
                Delivery Rates
              </Typography>
            </motion.div>
            <Grid container spacing={4} justifyContent="center">
              {[
                { title: "Standard Delivery", price: "$5.99 (3-5 business days)" },
                { title: "Express Delivery", price: "$9.99 (1-2 business days)" },
                { title: "Same-Day Delivery", price: "$14.99 (available in select areas)" },
              ].map((rate, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div variants={fadeInUp}>
                    <Paper
                      elevation={3}
                      sx={{ p: { xs: 2, md: 3 }, borderRadius: 2, textAlign: "center" }} // Reduce padding on mobile
                    >
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: "bold", fontSize: { xs: "1.25rem", md: "1.5rem" } }} // Reduce font size on mobile
                      >
                        {rate.title}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2, fontSize: { xs: "0.9rem", md: "1rem" } }}> {/* Reduce font size on mobile */}
                        {rate.price}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>
      <SuccessRate/>
      <Outlet/>

      {/* Nationwide Delivery Section */}
      <Box sx={{ py: { xs: 4, md: 6 }, background: "#FFC72C" }}>
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", textAlign: "center", fontSize: { xs: "1.75rem", md: "2.125rem" } }} // Reduce font size on mobile
              >
                Nationwide Delivery
              </Typography>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Typography
                variant="body1"
                sx={{ textAlign: "center", maxWidth: "800px", mx: "auto", fontSize: { xs: "0.9rem", md: "1rem" } }} // Reduce font size on mobile
              >
                We deliver to all countries accross the world! No matter where you
                are, Royal Express Delivery will get your package to its destination safely
                and on time.
              </Typography>
            </motion.div>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default TrackingPage;