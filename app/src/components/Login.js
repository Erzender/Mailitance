import React from "react";
import { connect } from "react-redux";

import Logo from "../../assets/LOGO-NSP_VF-1.svg";

const styles = {};

const Login = ({}) => (
  <div style={styles.container} className="d-flex flex-column align-items-center mt-5">
    <div className="d-flex align-items-center p-3 flex-column">
      <img src={Logo} alt="NSP Logo" />
      <b className="mt-2">MAILITANCE - le carnet d'adresses militant</b>
    </div>
    <form className="d-flex flex-column">
      <div className="form-group">
        <label for="username">Identifiant</label>
        <input
          type="text"
          className="form-control"
          id="username"
          aria-describedby="usernameHelp"
          placeholder="Indiquer l'identifiant"
        />
      </div>
      <div className="form-group">
        <label for="password">Mot de passe</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Mot de passe"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Connexion
      </button>
    </form>
  </div>
);

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
