import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* MODEL DATA */
const models = [
  {
    name: "Toyota Camry",
    year: "2021",
    slug: "toyota-camry",
    img: "https://static1.topspeedimages.com/wordpress/wp-content/uploads/2025/01/2019-toyota-camry-hybrid-se-3.jpg",
  },
  {
    name: "Rolls-Royce Ghost",
    year: "2022",
    slug: "rolls-royce-ghost",
    img: "https://media.autoexpress.co.uk/image/private/s--vWd8qMSJ--/v1598954380/autoexpress/2020/09/Rolls-Royce%20Ghost%202020%20-4.jpg",
  },
  {
    name: "Bentley Continental GT",
    year: "2020",
    slug: "bentley-continental-gt",
    img: "https://hips.hearstapps.com/hmg-prod/images/2025-bentley-continental-gt-106-677bfe089384c.jpg",
  },
  {
    name: "Mercedes-Maybach S-Class",
    year: "2021",
    slug: "maybach-s-class",
    img: "https://vehicle-images.dealerinspire.com/85b6-11001115/W1K6X7KB6RA276497/48ad537626547c13382cf26e1d19476f.jpg",
  },
  {
    name: "Aston Martin DB12",
    year: "2019",
    slug: "aston-martin-db12",
    img: "https://cdn.motor1.com/images/mgl/lE741O/s1/aston-martin-db12.jpg",
  },
  {
    name: "Pagani Huayra",
    year: "2018",
    slug: "pagani-huayra",
    img: "https://images4.alphacoders.com/870/870348.jpg",
  },
];

export default function Models() {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: "#0b0b0b", color: "#fff", minHeight: "100vh" }}>
      
      {/* HERO */}
      <Box
        sx={{
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" sx={{ fontWeight: 700 }}>
            Our Collection
          </Typography>
          <Typography sx={{ color: "#bbb", mt: 2 }}>
            Premium pre-owned luxury cars
          </Typography>
        </motion.div>
      </Box>

      {/* MODELS GRID */}
      <Box sx={{ py: 10, px: 6 }}>
        <Grid container spacing={4}>
          {models.map((model, index) => (
            <Grid item xs={4} key={index}>
              {/* xs={4} → 12 / 4 = 3 CARDS ALWAYS */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  onClick={() => navigate(`/models/${model.slug}`)}
                  sx={{
                    backgroundColor: "#000",
                    borderRadius: 3,
                    cursor: "pointer",
                    transition: "all 0.4s ease",
                    "&:hover": {
                      transform: "translateY(-12px)",
                      boxShadow: "0 30px 60px rgba(255,255,255,0.15)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="230"
                    image={model.img}
                    alt={model.name}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {model.name}
                    </Typography>
                    <Typography sx={{ color: "#aaa", fontSize: 14 }}>
                      Model Year • {model.year}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
 
}
