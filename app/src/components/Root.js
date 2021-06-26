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
    left: 0,
  },
};

const Root = ({}) => (
  <div style={styles.container} className="position-absolute">
    {/* <Login /> */}
    <Dashboard />
  </div>
);

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
