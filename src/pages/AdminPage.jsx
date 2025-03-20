import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Modal,
  IconButton,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { createProduct } from "../api/Product";
import { useNavigate } from "react-router-dom"; // For routing
import LogoutIcon from "@mui/icons-material/Logout"; // Logout icon

// Yup validation schema
const validationSchema = Yup.object({
  productName: Yup.string().required("Product Name is required"),
  customerName: Yup.string().required("Customer Name is required"),
  deliveryFrom: Yup.string().required("Delivery From is required"),
  deliveryTo: Yup.string().required("Delivery Address is required"),
  weight: Yup.string().required("Weight is required"),
  emailAddress: Yup.string()
    .email("Invalid email address")
    .required("Email Address is required"),
  phoneNumber: Yup.string()
    .matches(/^\+?[0-9]{10,15}$/, "Phone number is not valid")
    .required("Phone Number is required"),
  estimatedDeliveryTime: Yup.date().required(
    "Estimated Delivery Time is required"
  ),
});

const ProductForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const navigate = useNavigate(); // For routing

  const formik = useFormik({
    initialValues: {
      productName: "",
      customerName: "",
      deliveryFrom: "",
      deliveryTo: "",
      phoneNumber: "",
      emailAddress: "",
      weight: "",
      estimatedDeliveryTime: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const response = await createProduct(values);
        enqueueSnackbar("Product created successfully!", {
          variant: "success",
        });
        console.log("Product created successfully:", response);

        setTrackingId(response.trackingId);
        setModalOpen(true);

        resetForm();
      } catch (error) {
        enqueueSnackbar(error.message, { variant: "error" });
        console.error("Failed to create product:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  // Close the modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/admin"); // Redirect to /admin
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "16px",
        position: "relative", // For positioning the logout icon
      }}
    >
      {/* Logout Icon */}
      <IconButton
        onClick={handleLogout}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: "#00796b",
          "&:hover": {
            backgroundColor: "rgba(0, 121, 107, 0.1)",
          },
        }}
      >
        <LogoutIcon />
      </IconButton>

      <Box
        sx={{
          width: "100%",
          maxWidth: "500px",
          padding: "32px",
          borderRadius: "16px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold", color: "#00796b" }}
        >
          Create Product
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="productName"
            name="productName"
            label="Product Name"
            value={formik.values.productName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.productName && Boolean(formik.errors.productName)
            }
            helperText={formik.touched.productName && formik.errors.productName}
            margin="normal"
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            id="customerName"
            name="customerName"
            label="Customer Name"
            value={formik.values.customerName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.customerName && Boolean(formik.errors.customerName)
            }
            helperText={
              formik.touched.customerName && formik.errors.customerName
            }
            margin="normal"
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            id="emailAddress"
            name="emailAddress"
            label="Email Address"
            value={formik.values.emailAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.emailAddress && Boolean(formik.errors.emailAddress)
            }
            helperText={
              formik.touched.emailAddress && formik.errors.emailAddress
            }
            margin="normal"
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            id="weight"
            name="weight"
            label="Product weight"
            value={formik.values.weight}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.weight && Boolean(formik.errors.weight)}
            helperText={formik.touched.weight && formik.errors.weight}
            margin="normal"
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            id="deliveryFrom"
            name="deliveryFrom"
            label="Delivery From"
            value={formik.values.deliveryFrom}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.deliveryFrom && Boolean(formik.errors.deliveryFrom)
            }
            helperText={
              formik.touched.deliveryFrom && formik.errors.deliveryFrom
            }
            margin="normal"
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            id="deliveryTo"
            name="deliveryTo"
            label="Delivery To"
            value={formik.values.deliveryTo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.deliveryTo && Boolean(formik.errors.deliveryTo)
            }
            helperText={formik.touched.deliveryTo && formik.errors.deliveryTo}
            margin="normal"
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            margin="normal"
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            id="estimatedDeliveryTime"
            name="estimatedDeliveryTime"
            label="Estimated Delivery Time"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            value={formik.values.estimatedDeliveryTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.estimatedDeliveryTime &&
              Boolean(formik.errors.estimatedDeliveryTime)
            }
            helperText={
              formik.touched.estimatedDeliveryTime &&
              formik.errors.estimatedDeliveryTime
            }
            margin="normal"
            size="small"
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              marginTop: 2,
              backgroundColor: "#00796b",
              "&:hover": {
                backgroundColor: "#004d40",
              },
              borderRadius: "8px",
              padding: "10px",
              fontWeight: "bold",
            }}
          >
            {loading ? "Creating..." : "Create Product"}
          </Button>
        </form>
      </Box>

      {/* Modal to display trackingId */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="tracking-id-modal"
        aria-describedby="tracking-id-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Product Created Successfully!
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Your tracking ID is:
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{ fontWeight: "bold", color: "#00796b" }}
          >
            {trackingId}
          </Typography>
          <Button
            variant="contained"
            onClick={handleCloseModal}
            sx={{
              mt: 3,
              backgroundColor: "#00796b",
              "&:hover": {
                backgroundColor: "#004d40",
              },
              borderRadius: "8px",
              padding: "10px",
              fontWeight: "bold",
            }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default ProductForm;