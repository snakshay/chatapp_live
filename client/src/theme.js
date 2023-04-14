import { createTheme } from "@mui/material/styles";

const customTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          backgroundColor: "white"
        }
      }
    }
  }
});

export { customTheme };