import { Card, CardMedia, CardContent, Typography } from "@mui/material";

export default function Carcard({ car }) {
  return (
    <Card
      sx={{
        bgcolor: "#111",
        transition: "0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 10px 40px rgba(255,0,0,0.3)"
        },
      }}
    >
      <CardMedia component="img" height="200" image={car.image} />

      <CardContent>
        <Typography variant="h6">{car.name}</Typography>
        <Typography color="gray">{car.year}</Typography>
        <Typography variant="h6">${car.price}</Typography>
      </CardContent>
    </Card>
  );
}
