import { Box, Typography, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/* TEMP DATA (later replaced by backend) */
const modelData = [
  {
    slug: "toyota-camry",
    name: "Toyota Camry",
    year: "2021",
    price: "₹28,50,000",
    fuel: "Petrol",
    kms: "25,000 km",
    img: "https://static1.topspeedimages.com/wordpress/wp-content/uploads/2025/01/2019-toyota-camry-hybrid-se-3.jpg",
    description:
      "A premium sedan with excellent comfort, reliability and performance.",
  },
  {
    slug: "bentley-continental-gt",
    name: "Bentley Continental GT",
    year: "2020",
    price: "₹3.20 Cr",
    fuel: "Petrol",
    kms: "18,000 km",
    img: "https://hips.hearstapps.com/hmg-prod/images/2025-bentley-continental-gt-106-677bfe089384c.jpg",
    description:
      "Luxury grand tourer with handcrafted interiors and powerful performance.",
  },
  {
    slug: "rolls-royce-ghost",
    name: "Rolls-Royce Ghost",
    year: 2022,
    price: "₹6.95 Crore",
    fuel: "Petrol",
    transmission: "Automatic",
    kms: "9,500 km",
    owners: "First Owner",
    color: "Arctic White",
    location: "Mumbai",
    engine: "6.75L V12 Twin-Turbo",
    img: "https://media.autoexpress.co.uk/image/private/s--vWd8qMSJ--/v1598954380/autoexpress/2020/09/Rolls-Royce%20Ghost%202020%20-4.jpg",
    description:
      "The Rolls-Royce Ghost represents understated luxury with supreme comfort, handcrafted interiors, and whisper-quiet performance.",
  },
  {
    slug: "maybach-s-class",
    name: "Mercedes-Maybach S-Class",
    year: 2021,
    price: "₹3.10 Crore",
    fuel: "Petrol",
    transmission: "Automatic",
    kms: "14,000 km",
    owners: "First Owner",
    color: "Obsidian Black",
    location: "Delhi",
    engine: "4.0L V8 Bi-Turbo",
    img: "https://vehicle-images.dealerinspire.com/85b6-11001115/W1K6X7KB6RA276497/48ad537626547c13382cf26e1d19476f.jpg",
    description:
      "The Maybach S-Class delivers executive-class luxury with rear-seat comfort, cutting-edge technology, and a smooth, powerful drive.",
  },
  {
    slug: "aston-martin-db12",
    name: "Aston Martin DB12",
    year: 2019,
    price: "₹4.25 Crore",
    fuel: "Petrol",
    transmission: "Automatic",
    kms: "21,000 km",
    owners: "Second Owner",
    color: "Racing Green",
    location: "Bangalore",
    engine: "4.0L V8 Twin-Turbo",
    img: "https://cdn.motor1.com/images/mgl/lE741O/s1/aston-martin-db12.jpg",
    description:
      "The Aston Martin DB12 blends breathtaking design with thrilling performance, offering a true grand-touring experience.",
  },
   {
    slug: "pagani-huayra",
    name: "Pagani Huayra",
    year: 2018,
    price: "₹22 Crore",
    fuel: "Petrol",
    transmission: "Automatic",
    kms: "4,200 km",
    owners: "Single Owner",
    color: "Carbon Blue",
    location: "Hyderabad",
    engine: "6.0L V12 AMG",
    img: "https://images4.alphacoders.com/870/870348.jpg",
    description:
      "The Pagani Huayra is an ultra-rare hypercar combining art, engineering, and extreme performance with handcrafted perfection.",
  },
];

export default function ModelDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const model = modelData.find((item) => item.slug === slug);

  if (!model) {
    return (
      <Box sx={{ color: "#fff", p: 5 }}>
        <Typography>Model not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#0b0b0b", minHeight: "100vh", color: "#fff" }}>
      <motion.img
        src={model.img}
        alt={model.name}
        style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      <Box sx={{ p: 5 }}>
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          {model.name}
        </Typography>

        <Typography sx={{ color: "#aaa", mt: 1 }}>
          Model Year • {model.year}
        </Typography>

        <Typography sx={{ mt: 3 }}>{model.description}</Typography>

        <Typography sx={{ mt: 3 }}>💰 Price: {model.price}</Typography>
        <Typography>⛽ Fuel: {model.fuel}</Typography>
        <Typography>🚘 Driven: {model.kms}</Typography>

        <Button
          sx={{ mt: 4 }}
          variant="contained"
          onClick={() => navigate(-1)}
        >
          Back to Models
        </Button>
      </Box>
    </Box>
  );
}
