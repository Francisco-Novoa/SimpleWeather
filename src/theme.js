import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  typography: {
    fontFamily: ["Roboto Slab"],
  },
  palette: {
    error: {
      main: red.A400,
    },
    background: {
      light: "#ebebeb",
      black: "#000000",
    },
  },
});

export default theme;
