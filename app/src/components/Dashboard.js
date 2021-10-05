import React from "react";
import { connect } from "react-redux";

import Navbar from "./Navbar";
import Collect from "./Collect";

const styles = {
  container: { height: "100%" }
};

const Dashboard = ({ alerter, route, groupSelected }) =>
  <div style={styles.container}>
    <Navbar />
    <div
      className={"alert d-flex align-items-center " + alerter.type}
      role="alert"
    >
      {alerter.loader &&
        <div className="spinner-border mr-3" role="status">
          <span className="sr-only">Loading...</span>
        </div>}
      {alerter.message}
    </div>
    {groupSelected && route === "collect" && <Collect />}
  </div>;

const mapStateToProps = state => ({
  alerter: {
    message: "Rien à signaler",
    type: "alert-success",
    loader: false
  },
  route: Object.keys(state.nav)[0],
  groupSelected: state.selectedGroup !== null
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
