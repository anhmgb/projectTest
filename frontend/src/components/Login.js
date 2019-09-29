import React from "react";
import NavBar from "./commons/NavBar";

const Login = ({ history }) => {
  return (
    <React.Fragment>
      <NavBar history={history} />
      <div>Login</div>
    </React.Fragment>
  );
};

export default Login;
