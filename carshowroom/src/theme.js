import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#d50000" },
    background: {
      default: "#0b0b0b",
      paper: "#111",
    },
  },
});

export default theme;
