import React from "react";
import PropsType from "prop-types";

import Button from "@material-ui/core/Button";

const LogoutButton = ({ onLogout, history }) => {
  const handleLogout = () => {
    onLogout(history);
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

LogoutButton.propTypes = {
  onLogout: PropsType.func.isRequired,
  history: PropsType.object.isRequired
};

export default LogoutButton;
