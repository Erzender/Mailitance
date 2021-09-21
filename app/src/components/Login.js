import React from "react";
import { connect } from "react-redux";

import Logo from "../../assets/LOGO-NSP_VF-1.svg";
import { login } from "../duck/thunk";

const styles = {};

const Login = ({ onSubmit, loading, error }) =>
  <div
    style={styles.container}
    className="d-flex flex-column align-items-center mt-5"
  >
    <div className="d-flex align-items-center p-3 flex-column">
      <img src={Logo} alt="NSP Logo" />
      <b className="mt-2">MAILITANCE - le carnet d'adresses militant</b>
    </div>
    {loading &&
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>}
    {!loading &&
      <form className="d-flex flex-column" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Identifiant</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Indiquer l'identifiant"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
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
      </form>}
    {error &&
      <div className="alert alert-danger mt-3" role="alert">
        Erreur de connexion
      </div>}
  </div>;

const mapStateToProps = state => ({
  loading: state.loginFetching,
  error: !state.loginFetching && state.loginError
});

const mapDispatchToProps = dispatch => ({
  onSubmit: e => {
    e.preventDefault();
    dispatch(
      login(
        document.getElementById("username").value,
        document.getElementById("password").value
      )
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
