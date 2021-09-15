import React from "react";
import { connect } from "react-redux";

import Logo from "../../assets/LOGO-NSP_VF-1.svg";
import NavbarModal from "./Navbar_Modal";
import NavItem from "./Navbar_Item";

import {
  NAV_COLLECT,
  NAV_READ,
  NAV_GROUP,
  NAV_PROFILE,
  NAV_ADMIN,
  NAV_TITLES,
} from "../const";

const styles = {
  logo: { width: 70 },
};

const Navbar = ({ openModal, showNavbar, isNavbarShown }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <img
      className="navbar-brand"
      src={Logo}
      alt="NSP Logo"
      style={styles.logo}
      onClick={showNavbar}
    />
    <div
      className="dropdown-toggle user-select-none"
      href="#"
      id="navbarDropdown"
      role="button"
      onClick={openModal}
    >
      Ile de France
    </div>
    <NavbarModal />
    <div
      className={
        isNavbarShown
          ? "collapse navbar-collapse show"
          : "collapse navbar-collapse"
      }
      id="navbarSupportedContent"
    >
      <ul className="navbar-nav mr-auto "></ul>
      <ul className="navbar-nav  my-2 my-lg-0">
        <NavItem value={NAV_COLLECT} />
        <NavItem value={NAV_READ} />
        <NavItem value={NAV_GROUP} />
        <NavItem value={NAV_ADMIN} />
        <NavItem value={NAV_PROFILE} />
      </ul>
    </div>
  </nav>
);

const mapStateToProps = (state) => ({
  isNavbarShown: state.navbar.mobileShow,
});

const mapDispatchToProps = (dispatch) => ({
  openModal: () => dispatch({ type: "NAVBAR_TOGGLE_MODAL" }),
  showNavbar: () => dispatch({ type: "NAVBAR_MOBILE_TOGGLE" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
