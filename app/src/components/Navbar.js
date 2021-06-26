import React from "react";
import { connect } from "react-redux";

import Logo from "../../assets/LOGO-NSP_VF-1.svg";
import NavbarModal from "./Navbar_Modal";

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
        <li className="nav-item active">
          <a className="nav-link" href="#">
            Collecter
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Consulter
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Gestion du groupe
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Profil
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Admin
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

const mapStateToProps = (state) => ({
  isNavbarShown: state.navbar.mobileShow,
  randomText: "surprise",
});

const mapDispatchToProps = (dispatch) => ({
  openModal: () => dispatch({ type: "NAVBAR_TOGGLE_MODAL" }),
  showNavbar: () => dispatch({ type: "NAVBAR_MOBILE_TOGGLE" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
