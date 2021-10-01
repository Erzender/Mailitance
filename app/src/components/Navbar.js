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
  NAV_QUIT
} from "../const";

const styles = {
  logo: { width: 70 }
};

const Navbar = ({ openModal, showNavbar, isNavbarShown, selectedGroup }) =>
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
      {selectedGroup}
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
      <ul className="navbar-nav mr-auto " />
      <ul className="navbar-nav  my-2 my-lg-0">
        <NavItem value={NAV_COLLECT} />
        <NavItem value={NAV_READ} />
        <NavItem value={NAV_GROUP} />
        <NavItem value={NAV_ADMIN} />
        <NavItem value={NAV_PROFILE} />
        <NavItem value={NAV_QUIT} />
      </ul>
    </div>
  </nav>;

const mapStateToProps = state => {
  let groups = state.groups
    ? state.groups.filter(group => group.id === state.selectedGroup)
    : [];
  return {
    isNavbarShown: state.navbar.mobileShow,
    selectedGroup:
      state.selectedGroup && groups.length
        ? groups[0].title
        : "Sélectionner un groupe"
  };
};

const mapDispatchToProps = dispatch => ({
  openModal: () => dispatch({ type: "NAVBAR_TOGGLE_MODAL" }),
  showNavbar: () => dispatch({ type: "NAVBAR_MOBILE_TOGGLE" })
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
