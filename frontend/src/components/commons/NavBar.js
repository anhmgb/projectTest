import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import * as authActions from "../../actions/authActions";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  toolLeft: {
    display: "flex",
    flexGrow: 1
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(5),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  userInfo: {
    marginRight: theme.spacing(2)
  }
}));

const NavBar = ({ actions, history, auth }) => {
  const classes = useStyles();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (localStorage.getItem("jwtToken")) {
        await actions.auth.getCurrentUser();
      }
    };
    fetchCurrentUser();
  }, [actions]);

  return localStorage.getItem("jwtToken") && !auth.isAuthenticated ? (
    <div>isLoading</div>
  ) : (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.toolLeft}>
            <Typography className={classes.title} variant="h6" noWrap>
              Project-Test
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </div>
          {auth.isAuthenticated ? (
            <React.Fragment>
              <Typography variant="body2" className={classes.userInfo} noWrap>
                Hi, {auth.user.name} !
              </Typography>
              <LogoutButton onLogout={actions.auth.logout} history={history} />
            </React.Fragment>
          ) : (
            <LoginButton onLogin={actions.auth.login} history={history} />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

NavBar.propTypes = {
  actions: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      auth: bindActionCreators(authActions, dispatch)
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
