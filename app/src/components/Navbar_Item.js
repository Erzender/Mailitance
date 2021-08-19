import React from "react";
import { connect } from "react-redux";

import { NAV_TITLES } from "../const";

const styles = {};

const NavItem = ({ value, active, title, navTo }) => (
  <li className={"nav-item" + (active ? " active" : "")}>
    <a className="nav-link" href="#" onClick={() => navTo({ [value]: {} })}>
      {title}
    </a>
  </li>
);

const mapStateToProps = (state, ownProps) => ({
  title: NAV_TITLES[ownProps.value],
  active: ownProps.value === Object.keys(state.nav)[0],
});

const mapDispatchToProps = (dispatch) => ({
  openModal: () => dispatch({ type: "NAVBAR_TOGGLE_MODAL" }),
  showNavbar: () => dispatch({ type: "NAVBAR_MOBILE_TOGGLE" }),
  navTo: (route) => dispatch({ type: "NAVBAR_NAV_TO", route }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavItem);
