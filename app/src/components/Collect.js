import React from "react";
import { connect } from "react-redux";

import Navbar from "./Navbar";
import CollectForm from "./Collect_Form";

const styles = {
  container: { height: "100%" },
};

const Collect = ({ alerter }) => (
  <div style={styles.container}>
    <CollectForm />
  </div>
);

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Collect);
