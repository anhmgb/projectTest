import React from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import theme from "./theme";
import configureStore from "./store";

import Dashboard from "./components/dashboard";
import Login from "./components/Login";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  const store = configureStore();
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route path="/login" component={Login} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </MuiThemeProvider>
  );
};

export default App;
