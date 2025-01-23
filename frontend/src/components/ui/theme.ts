import { Theme } from "@chakra-ui/react";

export const customTheme = {
  ...Theme,
  colors: {
    brand: {
      lightest: "#e3f2fd",
      lighter: "#bbdefb",
      light: "#90caf9",
      base: "#64b5f6",
      primary: "#42a5f5",
      main: "#2196f3",
      dark: "#1e88e5",
      darker: "#1976d2",
      darkest: "#1565c0",
      deep: "#0d47a1",
    },
  },
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
};

