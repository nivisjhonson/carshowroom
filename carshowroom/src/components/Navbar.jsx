import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" sx={{ bgcolor: "black" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{ letterSpacing: 4, fontWeight: "bold", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          AUTOX
        </Typography>

        <Box>
          <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
          <Button color="inherit" onClick={() => navigate("/models")}>Models</Button>
          <Button color="inherit" onClick={() => navigate("/experience")}>Experience</Button>
          <Button color="inherit" onClick={() => navigate("/contact")}>Contact</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
