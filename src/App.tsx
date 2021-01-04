import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";

import Router from "./route";
import theme from "./utils/theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
};

export default App;
