import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import RoyalLogo from "../assets/RoyalLogo.png"; // Import the logo

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Handle mobile menu open
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle mobile menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Navbar links
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Track Shipment", path: "/#" },
    { name: "About Us", path: "/#" },
    { name: "Contact Us", path: "/#" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(135deg, #002366, #001A4D)", 
        boxShadow: "0px 4px 10px rgba(0, 35, 102, 0.3)", 
      }}
    >
      <Toolbar>
        {/* Logo and Text */}
        <Link to="/" style={{ textDecoration: "none", flexGrow: 1, display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            src={RoyalLogo}
            alt="Royal Express Delivery Logo"
            sx={{
              height: { xs: "60px", md: "60px" }, 
              width: "auto",
              marginRight: { xs: "10px", md: "20px" }, 
            }}
          />
          <Typography
            variant="h1"
            sx={{
              color: "whitesmoke",
              fontWeight: "500",
              fontSize: { xs: "1.2rem", md: "1.5rem" }, 
            }}
          >
            Royal Express Delivery
          </Typography>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                style={{
                  textDecoration: "none",
                  color: "#FFFFFF",
                  fontSize: "1rem",
                  fontWeight: "500",
                  "&:hover": {
                    color: "#FFC72C", 
                  },
                }}
              >
                {link.name}
              </Link>
            ))}
          </Box>
        )}

        {/* Mobile Navigation */}
        {isMobile && (
          <>
            <Box sx={{ flexGrow: 1 }} /> 
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{
                "& .MuiPaper-root": {
                  background: "#002366", 
                  color: "#FFFFFF", 
                },
              }}
            >
              {navLinks.map((link) => (
                <MenuItem
                  key={link.name}
                  onClick={handleMenuClose}
                  component={Link}
                  to={link.path}
                  sx={{
                    "&:hover": {
                      background: "#001A4D", 
                    },
                  }}
                >
                  {link.name}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;