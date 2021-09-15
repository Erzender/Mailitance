import React from "react";
import { connect } from "react-redux";

import "@forevolve/bootstrap-dark/dist/css/bootstrap-dark.min.css";
import "../styles.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { init } from "../duck/thunk";

const styles = {
  container: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
};

const Root = ({ loggedIn, token, initialized, initRoot }) => {
  initRoot(token, initialized);
  return (
    <div style={styles.container} className="position-absolute">
      {!loggedIn && <Login />}
      {loggedIn && <Dashboard />}
    </div>
  );
};

const mapStateToProps = state => ({
  loggedIn: state.token !== null && !state.loginFetching,
  token: state.token,
  initialized: state.initialized
});

const mapDispatchToProps = dispatch => ({
  initRoot: (initialized, token) => {
    if (!initialized) {
      dispatch(init(token));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
