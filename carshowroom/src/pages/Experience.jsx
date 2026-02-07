import { useState } from "react";
import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { motion } from "framer-motion";
import TestDriveModal from "../components/TestDriveModal";

const experiences = [
  {
    title: "Certified Luxury Cars",
    desc: "Every AUTOX vehicle undergoes a multi-point inspection to ensure premium quality, safety, and performance.",
  },
  {
    title: "Transparent Pricing",
    desc: "No hidden charges. What you see is what you pay, with fair market pricing and complete documentation.",
  },
  {
    title: "Trusted Ownership History",
    desc: "We provide verified ownership records and service history for complete peace of mind.",
  },
  {
    title: "Premium Customer Support",
    desc: "From test drive to delivery, our experts guide you at every step with a personalized experience.",
  },
  {
    title: "Easy Finance & Insurance",
    desc: "Flexible finance options and premium insurance support tailored for luxury vehicles.",
  },
  {
    title: "Nationwide Delivery",
    desc: "Choose your dream car from anywhere — we deliver across India with secure logistics.",
  },
];

export default function Experience() {
  const [testDriveOpen, setTestDriveOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState("");

  const handleTestDriveClick = (carModel = "") => {
    setSelectedCar(carModel);
    setTestDriveOpen(true);
  };

  const handleTestDriveClose = () => {
    setTestDriveOpen(false);
    setSelectedCar("");
  };

  return (
    <Box sx={{ backgroundColor: "#0d0d0d", color: "#fff", minHeight: "100vh" }}>
      
      {/* ================= HERO ================= */}
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: { xs: 3, md: 10 },
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.9)), url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
            The AUTOX Experience
          </Typography>
          <Typography sx={{ color: "#ccc", maxWidth: 600, fontSize: 18 }}>
            Discover a refined way to own pre-owned luxury cars with confidence,
            transparency, and unmatched service.
          </Typography>

          <Button
            variant="contained"
            onClick={() => handleTestDriveClick()}
            sx={{
              mt: 4,
              px: 4,
              py: 1.5,
              backgroundColor: "#fff",
              color: "#000",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#ddd",
              },
            }}
          >
            🚗 Request a Test Drive
          </Button>
        </motion.div>
      </Box>

      {/* ================= EXPERIENCE HIGHLIGHTS ================= */}
      <Box sx={{ px: { xs: 3, md: 10 }, py: 10 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, mb: 6, textAlign: "center" }}
        >
          Why Choose AUTOX
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {experiences.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  sx={{
                    backgroundColor: "#111",
                    borderRadius: 3,
                    height: "100%",
                    transition: "0.4s",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 20px 40px rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ mb: 1, fontWeight: 600 }}
                    >
                      {item.title}
                    </Typography>
                    <Typography sx={{ color: "#aaa", fontSize: 14 }}>
                      {item.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ================= CUSTOMER JOURNEY ================= */}
      <Box
        sx={{
          backgroundColor: "#000",
          px: { xs: 3, md: 10 },
          py: 8,
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
            A Seamless Luxury Journey
          </Typography>
          <Typography sx={{ color: "#bbb", maxWidth: 700, mx: "auto", mb: 4 }}>
            From selecting your car to doorstep delivery, AUTOX ensures a smooth,
            secure, and satisfying ownership experience tailored for luxury buyers.
          </Typography>

          <Button
            variant="contained"
            onClick={() => handleTestDriveClick()}
            sx={{
              px: 4,
              py: 1.5,
              backgroundColor: "#fff",
              color: "#000",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#ddd",
              },
            }}
          >
            🚗 Schedule Your Test Drive
          </Button>
        </motion.div>
      </Box>

      {/* Test Drive Modal */}
      <TestDriveModal 
        open={testDriveOpen} 
        onClose={handleTestDriveClose}
        carModel={selectedCar}
      />
    </Box>
  );
}
