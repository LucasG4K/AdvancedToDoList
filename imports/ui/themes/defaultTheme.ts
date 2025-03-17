import { createTheme } from "@mui/material/styles";

class Colors {
  readonly primary: string = "#fcbf49";
  readonly secondary: string = "#eae2b7";
  readonly terciary: string = "#f77f00";
}

const colors = new Colors();

const DefaultTheme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
  },
});

export default DefaultTheme;
export { colors };
