import { createTheme } from "@mui/material/styles";

export class Colors {
  readonly primary: string = "#fcbf49";
  readonly secondary: string = "#eae2b7";
  readonly terciary: string = "#f77f00";
}

const colors = new Colors();

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary, // Cor principal
    },
    secondary: {
      main: colors.secondary, // Cor secundária
    },
  },
});

export default theme;
