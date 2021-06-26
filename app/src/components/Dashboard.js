import React from "react";
import { connect } from "react-redux";

import Navbar from "./Navbar";

const styles = {
  container: { height: "100%" },
};

const Dashboard = ({ alerter }) => (
  <div style={styles.container}>
    <Navbar />
    <div
      className={"alert d-flex align-items-center" + alerter.type}
      role="alert"
    >
      {alerter.loader && (
        <div className="spinner-border mr-3" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {alerter.message}
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  alerter: {
    message: "Rien à signaler",
    type: " alert-success",
    loader: false,
  },
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
