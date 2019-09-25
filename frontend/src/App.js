import React from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./theme";

import Dummy from "./components/Dummy";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Dummy />
    </MuiThemeProvider>
  );
}

export default App;
