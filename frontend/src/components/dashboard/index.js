import React, { useState } from "react";
import PropTypes from "prop-types";

import NavBar from "../commons/NavBar";

const Dashboard = ({ history }) => {
  const [isLoading, setIsloading] = useState(false);

  return (
    <React.Fragment>
      {isLoading ? (
        <div>loading</div>
      ) : (
        <NavBar history={history} setIsloading={setIsloading} />
      )}
      <div> Dashboard </div>
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  history: PropTypes.object.isRequired
};

export default Dashboard;
