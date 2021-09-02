import React from "react";
import { connect } from "react-redux";

import "@forevolve/bootstrap-dark/dist/css/bootstrap-dark.min.css";
import "../styles.css";
import Login from "./Login";
import Dashboard from "./Dashboard";

const styles = {
  container: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
};

const Root = ({ loggedIn }) =>
  <div style={styles.container} className="position-absolute">
    {!loggedIn && <Login />}
    {loggedIn && <Dashboard />}
  </div>;

const mapStateToProps = state => ({
  loggedIn: state.token !== null
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
