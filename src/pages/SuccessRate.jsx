import React from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Slider from "react-slick";
import {
  DeliveryDining,
  ThumbUp,
  Repeat,
  Star,
} from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const countUp = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

// Carousel settings
const carouselSettings = {
  dots: true, // Show dots for navigation
  infinite: true, // Infinite loop
  speed: 1000, // Slide transition speed (1 second)
  slidesToShow: 3, // Number of slides to show at once
  slidesToScroll: 1, // Number of slides to scroll
  autoplay: true, // Auto-play the carousel
  autoplaySpeed: 5000, // Auto-play speed (5 seconds)
  responsive: [
    {
      breakpoint: 1024, // For tablets
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600, // For mobile devices
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const SuccessRate = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <Box
      sx={{
        py: { xs: 4, md: 8 },
        background: "#f5f5f5",
      }}
    >
      <Container>
        {/* Success Rate Section */}
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={fadeInUp}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  fontSize: { xs: "1.5rem", md: "2rem" },
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Our Success Rate
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                We take pride in our high success rates and customer satisfaction.
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} justifyContent="center">
              {/* Animated Success Rate Figures */}
              {[
                { value: 95, label: "On-Time Delivery", icon: <DeliveryDining fontSize="large" /> },
                { value: 98, label: "Customer Satisfaction", icon: <ThumbUp fontSize="large" /> },
                { value: 90, label: "Repeat Customers", icon: <Repeat fontSize="large" /> },
              ].map((item, index) => (
                <Grid item xs={6} sm={4} key={index}>
                  <motion.div
                    initial="hidden"
                    animate={controls}
                    variants={countUp}
                  >
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 2,
                        background: "#ffffff",
                        borderRadius: 2,
                        boxShadow: 2,
                        height: "100%",
                      }}
                    >
                      <Box sx={{ color: "#002366", mb: 1 }}>
                        {item.icon}
                      </Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: "bold",
                          color: "#002366",
                          fontSize: { xs: "1.5rem", md: "2rem" },
                        }}
                      >
                        {item.value}%
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#666",
                          fontSize: { xs: "0.8rem", md: "0.9rem" },
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Customer Testimonials Section */}
        <Box sx={{ mt: { xs: 4, md: 8 } }}>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={fadeInUp}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 4,
                fontSize: { xs: "1.5rem", md: "2rem" },
                textAlign: "center",
              }}
            >
              What Our Customers Say
            </Typography>
          </motion.div>
          <Slider {...carouselSettings}>
            {[
              {
                name: "John Doe",
                comment:
                  "Royal Express Delivery is the best! My packages always arrive on time, and their customer service is top-notch.",
              },
              {
                name: "Jane Smith",
                comment:
                  "I’ve been using their services for years, and I’ve never been disappointed. Highly recommended!",
              },
              {
                name: "Michael Brown",
                comment:
                  "Fast, reliable, and affordable. What more could you ask for? Great job, Royal Express!",
              },
              {
                name: "Sarah Johnson",
                comment:
                  "Excellent service! The team is very professional and always goes the extra mile.",
              },
              {
                name: "David Wilson",
                comment:
                  "I love how easy it is to track my shipments. Royal Express makes everything so simple!",
              },
            ].map((testimonial, index) => (
              <Box key={index} sx={{ px: 1 }}>
                <Box
                  sx={{
                    p: { xs: 2, md: 3 }, 
                    background: "#ffffff",
                    borderRadius: 2,
                    boxShadow: 2,
                    height: "100%",
                    mx: 1, // Add horizontal margin for spacing between slides
                  }}
                >
                  <Box sx={{ color: "#FFC72C", mb: 2 }}>
                    <Star fontSize={window.innerWidth < 600 ? "medium" : "large"} /> 
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 2,
                      fontSize: { xs: "0.8rem", md: "1rem" }, 
                    }}
                  >
                    "{testimonial.comment}"
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "0.8rem", md: "1rem" }, // Reduce font size on mobile
                    }}
                  >
                    - {testimonial.name}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
};

export default SuccessRate;