import { createTheme } from "@mui/material/styles";
import { green, red, grey } from "@mui/material/colors";

const monocleTheme = createTheme({
  typography: {
    fontFamily: '"Montserrat", sans-serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: "rgb(211 214 216 / 60%) 0px 4px 20px",
        },
      },
    },
  },
  palette: {
    custom: {
      black: "#000000",
      white: "#ffffff",
      yellowMain: "#FFBD12",
      yellowSecondary: "#FFF4CC",
      greenMain: green[500],
      greenSecondary: green[300],
      greenLight: green[100],
      redMain: "#F95A2C",
      redSecondary: red[300],
      redLight: red[100],
      greyMain: grey[600],
      shadow: "rgb(211 214 216 / 60%) 0px 4px 20px",
      overlay: "rgba(0, 0, 0, 0.23)",
    },
  },
});

export default monocleTheme;
