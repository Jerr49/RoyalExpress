import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Footer = () => {
  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        background: "#002366",
        color: "#FFFFFF",
      }}
    >
      <Container>
        <Grid container spacing={4} justifyContent="center">
          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <motion.div variants={fadeInUp}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  fontSize: { xs: "1.25rem", md: "1.5rem" },
                }}
              >
                Quick Links
              </Typography>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{
                  display: "block",
                  mb: 1,
                  fontSize: { xs: "0.9rem", md: "1rem" },
                }}
              >
                Home
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{
                  display: "block",
                  mb: 1,
                  fontSize: { xs: "0.9rem", md: "1rem" },
                }}
              >
                About Us
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{
                  display: "block",
                  mb: 1,
                  fontSize: { xs: "0.9rem", md: "1rem" },
                }}
              >
                Contact Us
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{
                  display: "block",
                  mb: 1,
                  fontSize: { xs: "0.9rem", md: "1rem" },
                }}
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{
                  display: "block",
                  mb: 1,
                  fontSize: { xs: "0.9rem", md: "1rem" },
                }}
              >
                Terms of Service
              </Link>
            </motion.div>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} sm={6} md={4}>
            <motion.div variants={fadeInUp}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  fontSize: { xs: "1.25rem", md: "1.5rem" },
                }}
              >
                Contact Information
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Email sx={{ mr: 1 }} />
                <Typography
                  variant="body1"
                  sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                >
                  royalexpressdelivery.inc.ng@gmail.com
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Phone sx={{ mr: 1 }} />
                <Typography
                  variant="body1"
                  sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                >
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <LocationOn sx={{ mr: 1 }} />
                <Typography
                  variant="body1"
                  sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                >
                  USA: 1234 Innovation Drive Suite 567 San Francisco, CA 94107
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <LocationOn sx={{ mr: 1 }} />
                <Typography
                  variant="body1"
                  sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                >
                  Canada: 456 Maple Street, Toronto, ON M1M 1M1
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <LocationOn sx={{ mr: 1 }} />
                <Typography
                  variant="body1"
                  sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                >
                  UK: 789 Oxford Street, London, W1D 1BS
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <LocationOn sx={{ mr: 1 }} />
                <Typography
                  variant="body1"
                  sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                >
                  Nigeria: 101 Lagos Road, Ikeja, Lagos 100001
                </Typography>
              </Box>
            </motion.div>
          </Grid>

          {/* Newsletter Subscription */}
          <Grid item xs={12} sm={6} md={4}>
            <motion.div variants={fadeInUp}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  fontSize: { xs: "1.25rem", md: "1.5rem" },
                }}
              >
                Subscribe to Our Newsletter
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter your email"
                variant="outlined"
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    background: "#FFFFFF",
                  },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  borderRadius: 2,
                  background: "linear-gradient(135deg, #FFC72C, #E0B120)",
                  color: "#000000",
                  "&:hover": {
                    background: "linear-gradient(135deg, #E0B120, #FFC72C)",
                  },
                }}
              >
                Subscribe
              </Button>
            </motion.div>
          </Grid>
        </Grid>

        {/* Social Media Links */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <motion.div variants={fadeInUp}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Follow Us
            </Typography>
            <Box>
              <IconButton href="#" color="inherit">
                <Facebook sx={{ "&:hover": { color: "#FFC72C" } }} />
              </IconButton>
              <IconButton href="#" color="inherit">
                <Twitter sx={{ "&:hover": { color: "#FFC72C" } }} />
              </IconButton>
              <IconButton href="#" color="inherit">
                <Instagram sx={{ "&:hover": { color: "#FFC72C" } }} />
              </IconButton>
              <IconButton href="#" color="inherit">
                <LinkedIn sx={{ "&:hover": { color: "#FFC72C" } }} />
              </IconButton>
            </Box>
          </motion.div>
        </Box>

        {/* Copyright */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <motion.div variants={fadeInUp}>
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: "0.8rem", md: "0.875rem" } }}
            >
              &copy; {new Date().getFullYear()} Royal Express Delivery. All
              rights reserved.
            </Typography>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
