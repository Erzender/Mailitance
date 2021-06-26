import React from "react";
import { connect } from "react-redux";

import Navbar from "./Navbar";

const styles = {
  container: { height: "100%" },
};

const Dashboard = ({}) => (
  <div style={styles.container}>
    <Navbar />
  </div>
);

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
