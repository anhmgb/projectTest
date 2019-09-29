import React from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import theme from "./theme";
import configureStore from "./store";

import Dummy from "./components/Dummy";
import NavBar from "./components/commons/NavBar";

const App = () => {
  const store = configureStore();
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <Route exact path="/what" component={Dummy} />
        </BrowserRouter>
      </Provider>
    </MuiThemeProvider>
  );
};

export default App;
