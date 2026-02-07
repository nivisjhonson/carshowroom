import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/* HERO BACKGROUND */
const bgImage =
  "https://wallpapercave.com/wp/wp13717745.jpg";

/* MODELS DATA */
const cars = [
  {
    name: "Porsche 911",
    img: "https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/AU_local/2022/Products_AU/911-GTS--Product-Highlights/911-GTS-Australian-images---exterior-static/PORSCHE_TAYCANGTS_911GTS_DKIMG_0920.jpg/jcr:content/PORSCHE_TAYCANGTS_911GTS_DKIMG_0920.jpg",
    path: "/models/911",
  },
  {
    name: "Toyota Supra",
    img: "https://static1.topspeedimages.com/wordpress/wp-content/uploads/2024/01/silver-1993-toyota-supra.jpg",
    path: "/models/supra",
  },
  {
    name: "BMW M4",
    img: "https://s1.cdn.autoevolution.com/images/gallery/bmw-m4-cs-2024-7744_70.jpg",
    path: "/models/m4",
  },
];

export default function Home() {
  return (
    <Box sx={{ backgroundColor: "#0b0b0b", overflowX: "hidden" }}>
      {/* ================= HERO ================= */}
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {/* DARK OVERLAY */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.65)",
            zIndex: 1,
          }}
        />

        {/* RIGHT CORNER LOGO */}
        <motion.img
          src="https://tse3.mm.bing.net/th/id/OIP.KcbAQ6HR3_69EzS3nykDMwAAAA?pid=Api&P=0&h=180"
          alt="AUTOX Logo"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: "50%",
            right: "40px",
            transform: "translateY(-50%)",
            width: "180px",
            zIndex: 3,
          }}
        />

        {/* HERO CONTENT */}
        <Grid
          container
          alignItems="center"
          sx={{
            minHeight: "100vh",
            position: "relative",
            zIndex: 2,
            px: { xs: 3, md: 10 },
          }}
        >
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Typography
                variant="h2"
                sx={{ color: "#fff", fontWeight: 700, lineHeight: 1.1 }}
              >
                Experience <br /> Pure Performance
              </Typography>

              <Typography
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  mt: 2,
                  maxWidth: 500,
                }}
              >
                AUTOX offers certified second-hand premium luxury cars with uncompromising quality and trust.
              </Typography>

              {/* 🔘 ANIMATED BUTTON */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Button
                  component={Link}
                  to="/models"
                  variant="outlined"
                  sx={{
                    mt: 4,
                    px: 5,
                    py: 1.5,
                    color: "#fff",
                    borderColor: "#fff",
                    fontWeight: 500,
                    transition: "all 0.4s ease",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#000",
                      transform: "scale(1.05)",
                    },
                    "&:active": {
                      transform: "scale(0.95)",
                    },
                  }}
                >
                  Explore Models
                </Button>
              </motion.div>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      {/* ================= COLLECTION ================= */}
      <Box sx={{ py: 10, px: { xs: 3, md: 10 } }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h3"
            sx={{ color: "#fff", fontWeight: 700, mb: 6 }}
          >
            Our Collection
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {cars.map((car, index) => (
            <Grid item xs={12} md={4} key={index}>
              {/* 🏎️ ANIMATED CARD */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
              >
                <Card
                  component={Link}
                  to={car.path}
                  sx={{
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 4,
                    overflow: "hidden",
                    textDecoration: "none",
                    transition: "all 0.4s ease",
                    "&:hover": {
                      transform: "translateY(-12px)",
                    },
                  }}
                >
                  <Box sx={{ overflow: "hidden" }}>
                    <CardMedia
                      component="img"
                      height="240"
                      image={car.img}
                      alt={car.name}
                      sx={{
                        transition: "transform 0.6s ease",
                        "&:hover": {
                          transform: "scale(1.08)",
                        },
                      }}
                    />
                  </Box>

                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#fff",
                        fontWeight: 600,
                        transition: "color 0.3s",
                        "&:hover": { color: "#f5f5f5" },
                      }}
                    >
                      {car.name}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ================= FOOTER ================= */}
      <Box
        component="footer"
        sx={{
          width: "100%",
          backgroundColor: "#000",
          px: { xs: 2, sm: 4, md: 10 },
          py: 6,
        }}
      >
        <Grid container spacing={4} sx={{ maxWidth: "1400px", mx: "auto" }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
              AUTOX Showroom
            </Typography>
            <Typography sx={{ color: "#aaa" }}>
              Driven by excellence,Defined by luxury,AUTOX premium pre-owned cars.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
              Quick Links
            </Typography>
            <Typography sx={{ color: "#aaa" }}>Home</Typography>
            <Typography sx={{ color: "#aaa" }}>Models</Typography>
            <Typography sx={{ color: "#aaa" }}>Experience</Typography>
            <Typography sx={{ color: "#aaa" }}>Contact</Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
              Contact
            </Typography>
            <Typography sx={{ color: "#aaa" }}>info@autox.com</Typography>
            <Typography sx={{ color: "#aaa" }}>+91 98765 43210</Typography>
            <Typography sx={{ color: "#aaa" }}>India</Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: "1px solid #222",
            mt: 5,
            pt: 3,
            textAlign: "center",
            maxWidth: "1400px",
            mx: "auto",
          }}
        >
          <Typography sx={{ color: "#777", fontSize: 14 }}>
            © {new Date().getFullYear()} Porsche. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
