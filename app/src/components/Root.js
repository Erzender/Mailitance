import React from "react";
import { connect } from "react-redux";

const styles = {};

const Root = ({}) => (
  <div style={styles.container}>
    App
  </div>
);

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
