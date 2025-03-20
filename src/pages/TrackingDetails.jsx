import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  LinearProgress,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Container,
  Fade,
  Slide,
  Grow,
  Button,
  Modal,
  IconButton,
} from "@mui/material";
import dayjs from "dayjs";
import {
  CheckCircle as CheckCircleIcon,
  LocalShipping as LocalShippingIcon,
  Assignment as AssignmentIcon,
  Flight as FlightIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import RoyalLogo from "../assets/RoyalLogo.png";

const steps = [
  { label: "Order Processed", icon: <AssignmentIcon /> },
  { label: "Shipped", icon: <LocalShippingIcon /> },
  { label: "Out for Delivery", icon: <FlightIcon /> },
  { label: "Delivered", icon: <CheckCircleIcon /> },
];

const TrackingDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { productDetails } = location.state || {};
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [isDelivered, setIsDelivered] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State to control pop-up visibility

  useEffect(() => {
    if (productDetails) {
      const interval = setInterval(() => {
        const now = dayjs();
        const createdAt = dayjs(productDetails.createdAt);
        const estimatedDeliveryTime = dayjs(productDetails.estimatedDeliveryTime);

        // Calculate elapsed time and total delivery time
        const elapsedTime = now.diff(createdAt);
        const totalDeliveryTime = estimatedDeliveryTime.diff(createdAt);

        // Calculate progress percentage
        const progressPercentage = Math.min(
          (elapsedTime / totalDeliveryTime) * 100,
          100
        );
        setProgress(progressPercentage);

        // Calculate time remaining
        const timeRemainingMs = estimatedDeliveryTime.diff(now);
        if (timeRemainingMs > 0) {
          const hours = Math.floor(timeRemainingMs / (1000 * 60 * 60));
          const minutes = Math.floor(
            (timeRemainingMs % (1000 * 60 * 60)) / (1000 * 60)
          );
          setTimeRemaining(`${hours}h ${minutes}m remaining`);
          setIsDelivered(false);
        } else {
          setTimeRemaining("Delivered");
          setIsDelivered(true);
          setShowPopup(true); // Show pop-up when delivered
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [productDetails]);

  if (!productDetails) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h5">No tracking details found.</Typography>
      </Box>
    );
  }

  // Function to format phone number with country code and brackets
  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
    }
    return phoneNumber;
  };

  // Function to handle "Track New" button click
  const handleTrackNew = () => {
    navigate("/");
  };

  // Function to close the pop-up
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Fade in={true} timeout={1000}>
        <Paper
          elevation={3}
          sx={{
            borderRadius: 2,
            bgcolor: "background.paper",
            p: { xs: 3, sm: 4, md: 5 },
            background: "#F5F5F5",
          }}
        >
          {/* Header Section with Logo */}
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Slide direction="down" in={true} timeout={800}>
              <img src={RoyalLogo} alt="Royal Logo" style={{ width: "150px" }} />
            </Slide>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#351C15",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Shipment Tracking
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#666", mt: 2, fontFamily: "Open Sans, sans-serif" }}
            >
              Track your shipment in real-time
            </Typography>
          </Box>

          {/* Tracking Progress Section */}
          <Box sx={{ mb: 6 }}>
            <Stepper
              activeStep={isDelivered ? steps.length - 1 : 2}
              alternativeLabel
            >
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    icon={
                      <Grow in={true} timeout={index * 500}>
                        {step.icon}
                      </Grow>
                    }
                    sx={{
                      "& .MuiStepLabel-label": {
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        fontWeight: "bold",
                        color: "#351C15",
                        fontFamily: "Roboto, sans-serif",
                      },
                      "& .MuiSvgIcon-root": {
                        color: isDelivered
                          ? "#4CAF50"
                          : index <= (isDelivered ? steps.length - 1 : 2)
                          ? "#FFC72C"
                          : "#E0E0E0",
                      },
                    }}
                  >
                    {step.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          {/* Shipment Details Section */}
          <Grid container spacing={4} sx={{ mb: 6 }}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "normal",
                  color: "#351C15",
                  fontFamily: "Roboto, sans-serif",
                  mb: 2,
                }}
              >
                <strong style={{ color: "#002366" }}>Tracking Number:</strong>{" "}
                {productDetails.trackingId}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "normal",
                  color: "#351C15",
                  fontFamily: "Roboto, sans-serif",
                  mb: 2,
                }}
              >
                <strong style={{ color: "#002366" }}>Product Name:</strong>{" "}
                {productDetails.productName}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "normal",
                  color: "#351C15",
                  fontFamily: "Roboto, sans-serif",
                  mb: 2,
                }}
              >
                <strong style={{ color: "#002366" }}>Reciever's Name:</strong>{" "}
                {productDetails.customerName}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "normal",
                  color: "#351C15",
                  fontFamily: "Roboto, sans-serif",
                  mb: 2,
                }}
              >
                <strong style={{ color: "#002366" }}>Email Address:</strong>{" "}
                {productDetails.emailAddress}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "normal",
                  color: "#351C15",
                  fontFamily: "Roboto, sans-serif",
                  mb: 2,
                }}
              >
                <strong style={{ color: "#002366" }}>Phone Number:</strong>{" "}
                {formatPhoneNumber(productDetails.phoneNumber)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "normal",
                  color: "#351C15",
                  fontFamily: "Roboto, sans-serif",
                  mb: 2,
                }}
              >
                <strong style={{ color: "#002366" }}>Shipment Weight:</strong>{" "}
                {productDetails.weight} kg
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "normal",
                  color: "#351C15",
                  fontFamily: "Roboto, sans-serif",
                  mb: 2,
                }}
              >
                <strong style={{ color: "#002366" }}>Sender Address:</strong>{" "}
                {productDetails.deliveryFrom}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "normal",
                  color: "#351C15",
                  fontFamily: "Roboto, sans-serif",
                  mb: 2,
                }}
              >
                <strong style={{ color: "#002366" }}>Delivery Address:</strong>{" "}
                {productDetails.deliveryTo}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "normal",
                  color: "#351C15",
                  fontFamily: "Roboto, sans-serif",
                  mb: 2,
                }}
              >
                <strong style={{ color: "#002366" }}>
                  Estimated Delivery:
                </strong>{" "}
                {dayjs(productDetails.estimatedDeliveryTime).format(
                  "ddd, MMM D, YYYY h:mm A"
                )}
              </Typography>
            </Grid>
          </Grid>

          {/* Progress Bar and Time Remaining */}
          {productDetails.status === "In Transit" && (
            <Box sx={{ mt: 4, mb: 4 }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#E0E0E0",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: isDelivered ? "#4CAF50" : "#FFC72C",
                  },
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  color: "#351C15",
                  mt: 2,
                  fontFamily: "Roboto, sans-serif",
                }}
              >
                {timeRemaining}
              </Typography>
            </Box>
          )}

          {/* Delivery Instructions */}
          <Box sx={{ mt: 4, p: 3, background: "#FFFFFF", borderRadius: "8px" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#351C15",
                mb: 2,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Delivery Instructions
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#666", fontFamily: "Open Sans, sans-serif" }}
            >
              {productDetails.deliveryInstructions ||
                "No specific instructions provided. Please contact the customer for details."}
            </Typography>
          </Box>

          {/* Track New Button */}
          <Box
            sx={{
              mt: 4,
              textAlign: { xs: "center", sm: "right" },
            }}
          >
            <Button
              variant="contained"
              onClick={handleTrackNew}
              sx={{
                width: "250px",
                backgroundColor: "#002366",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#001A4D",
                },
              }}
            >
              Track New Product
            </Button>
          </Box>
        </Paper>
      </Fade>

      {/* Pop-Up Notification */}
      <Modal open={showPopup} onClose={handleClosePopup}>
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: { xs: "min(90%, 320px)", sm: "400px" }, // Ensure proper spacing on small screens
      maxWidth: "95vw", // Prevent it from being too wide
      bgcolor: "background.paper",
      borderRadius: 2,
      boxShadow: 24,
      p: { xs: 3, sm: 4 }, // Increased padding on mobile for better spacing
      textAlign: "center",
    }}
  >
    <IconButton
      onClick={handleClosePopup}
      sx={{ position: "absolute", top: 8, right: 8 }}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
    <Grow in={showPopup} timeout={500}>
      <Box>
        <CheckCircleIcon
          sx={{
            fontSize: { xs: 40, sm: 60 },
            color: "#4CAF50",
            mb: 2,
          }}
        />
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontSize: { xs: "1.25rem", sm: "1.5rem" },
          }}
        >
          Product Delivered!
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 3,
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          Congratulations! Your product has been successfully delivered. Please
          check your email for further instructions on how to receive it.
        </Typography>
        <Button
          variant="contained"
          onClick={handleClosePopup}
          sx={{
            backgroundColor: "#002366",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#001A4D",
            },
            fontSize: { xs: "0.875rem", sm: "1rem" },
            padding: { xs: "6px 12px", sm: "8px 16px" },
          }}
        >
          Close
        </Button>
      </Box>
    </Grow>
  </Box>
</Modal>

    </Container>
  );
};

export default TrackingDetailsPage;