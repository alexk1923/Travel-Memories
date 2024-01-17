import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { ReactElement } from "react";

const CustomThemeProvider = ({ children }: { children: ReactElement }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#001A8C",
        light: "#001AcC",
        dark: "#001A5C",
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: "#F2F2F2",
        light: "#FFFFFF",
        // dark: will be calculated from palette.secondary.main,
        contrastText: "#001A5C",
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default CustomThemeProvider;
