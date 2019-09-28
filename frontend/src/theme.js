import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: "#ffcc80"
    },
    error: {
      main: "#f44336"
    }
  },
  typography: {
    fontFamily: "'Montserrat Alternates', 'Aldrich'"
  }
});

export default theme;
