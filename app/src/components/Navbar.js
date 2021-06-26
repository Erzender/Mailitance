import React from "react";
import { connect } from "react-redux";

import Logo from "../../assets/LOGO-NSP_VF-1.svg";

const styles = {
  logo: { width: 70 },
};

const Navbar = ({}) => (
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <img class="navbar-brand" src={Logo} alt="NSP Logo" style={styles.logo} />
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">
            Profil <span class="sr-only">(current)</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Administration
          </a>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Ile de France
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Modération
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Collecte
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Consulter
          </a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Recherche"
          aria-label="Search"
        />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          Chercher
        </button>
      </form>
    </div>
  </nav>
);

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
