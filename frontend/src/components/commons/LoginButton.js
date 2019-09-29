import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { withFormik, Form } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: 0,
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: theme.spacing(42)
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1),
    width: theme.spacing(42)
  },
  dialog: {
    position: "relative",
    zIndex: 1
  },
  dialogTitle: {
    textAlign: "center"
  },
  dialogContent: {
    overflow: "hidden"
  },
  slogan: {
    marginBottom: 0,
    paddingBottom: 0
  },
  sloganContent: {
    paddingBottom: 0,
    textAlign: "center"
  },
  avatar: {
    width: theme.spacing(23),
    height: "auto"
  },
  errorMessage: {
    marginLeft: theme.spacing(1),
    color: theme.palette.error.main
  },
  progress: {
    position: "absolute",
    opacity: 2,
    zIndex: 2,
    top: "45%",
    left: "48%"
  }
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const LoginButton = ({
  values,
  handleChange,
  handleSubmit,
  errors,
  touched,
  isSubmitting
}) => {
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const classes = useStyles();

  const handleOpenLoginForm = () => {
    setOpenLoginForm(true);
  };

  const handleCloseLoginForm = () => {
    setOpenLoginForm(false);
  };

  const renderLoginForm = () => {
    return (
      <Dialog
        open={openLoginForm}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseLoginForm}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        className={classes.dialog}
      >
        {isSubmitting && <CircularProgress className={classes.progress} />}
        <div style={{ opacity: isSubmitting ? 0.4 : 1 }}>
          <DialogTitle
            id="alert-dialog-slide-title"
            className={classes.dialogTitle}
          >
            Wellcome back, my friend !!!
          </DialogTitle>
          <DialogContent className={classes.slogan}>
            <DialogContentText
              id="alert-dialog-slide-description"
              className={classes.sloganContent}
            >
              "Chúng ta của sau này cái gì cũng có, chỉ là không có ... chúng
              ta"
            </DialogContentText>
          </DialogContent>
          <DialogContent className={classes.dialogContent}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Avatar
                  alt="Avatar img"
                  src="/groot.png"
                  className={classes.avatar}
                />
              </Grid>
              <Grid item xs={8}>
                <Form onSubmit={handleSubmit}>
                  <TextField
                    id="standard-dense"
                    label="Email"
                    name="email"
                    className={classes.textField}
                    value={values.email}
                    onChange={handleChange}
                  />
                  {touched.email && errors.email && (
                    <Typography
                      variant="subtitle2"
                      className={classes.errorMessage}
                    >
                      {errors.email}
                    </Typography>
                  )}
                  <TextField
                    id="standard-password-input"
                    label="Password"
                    name="password"
                    className={classes.textField}
                    type="password"
                    autoComplete="current-password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  {touched.password && errors.password && (
                    <Typography
                      variant="subtitle2"
                      className={classes.errorMessage}
                    >
                      {errors.password}
                    </Typography>
                  )}
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    disabled={isSubmitting}
                  >
                    <VerifiedUser className={classes.leftIcon} />
                    Login with google
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Login
                  </Button>
                </Form>
              </Grid>
            </Grid>
          </DialogContent>
        </div>
      </Dialog>
    );
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleOpenLoginForm}
      >
        Login
      </Button>
      {renderLoginForm()}
    </React.Fragment>
  );
};

LoginButton.propTypes = {
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default withFormik({
  mapPropsToValues() {
    return {
      email: "anhmgb@hblab.vn",
      password: ""
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .min(6)
      .max(20)
      .required()
  }),
  handleSubmit(userData, { setSubmitting, setErrors, props }) {
    setSubmitting(true);
    props.onLogin(userData, setSubmitting, setErrors, props.history);
  }
})(LoginButton);
