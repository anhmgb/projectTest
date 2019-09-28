import React from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { BrowserRouter, Route } from "react-router-dom";
import theme from "./theme";

import Dummy from "./components/Dummy";
import NavBar from "./components/commons/NavBar";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <NavBar />
        <Route exact path="/what" component={Dummy} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
