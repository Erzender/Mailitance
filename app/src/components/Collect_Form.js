import React from "react";
import { connect } from "react-redux";

import Navbar from "./Navbar";

const styles = { container: { maxWidth: 1200 } };

const CollectForm = ({ alerter, onSubmit }) =>
  <form className="p-3 mx-auto" style={styles.container} onSubmit={onSubmit}>
    Aucun champ n'est requis.<br />
    <br />
    <br />
    <div className="form-group">
      <label htmlFor="lastname">Nom de famille</label>
      <input
        type="text"
        className="form-control"
        id="lastname"
        placeholder="Nom de famille"
      />
    </div>
    <div className="form-group">
      <label htmlFor="firstname">Prénom</label>
      <input
        type="text"
        className="form-control"
        id="firstname"
        placeholder="Prénom"
      />
    </div>
    <div className="form-group">
      <label htmlFor="age">Age</label>
      <select className="custom-select" defaultValue={null}>
        <option value={null}>Sélectionner une tranche d'âge</option>
        <option value="16">16 - 25</option>
        <option value="26">26 - 35</option>
        <option value="36">36 - 50</option>
        <option value="51">51 - 62</option>
        <option value="62">63+</option>
      </select>
    </div>
    <div className="form-group">
      <label htmlFor="address">Adresse</label>
      <input
        type="text"
        className="form-control"
        id="address"
        placeholder="Adresse"
      />
    </div>
    <div className="form-group">
      <label htmlFor="district">Quartier</label>
      <input
        type="text"
        className="form-control"
        id="district"
        placeholder="Quartier"
      />
    </div>
    <div className="form-group">
      <label htmlFor="voteSector">Secteur de vote</label>
      <input
        type="text"
        className="form-control"
        id="voteSector"
        placeholder="Secteur de vote"
      />
    </div>
    <div className="form-group">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        className="form-control"
        id="email"
        placeholder="Email"
      />
    </div>
    <div className="form-group">
      <label htmlFor="phone">Téléphone</label>
      <input
        type="phone"
        className="form-control"
        id="phone"
        placeholder="Téléphone"
      />
    </div>
    <div className="form-group">
      <label htmlFor="topics">Sujets d'intérêt</label>
      <select className="custom-select" multiple>
        <option>Ecologie</option>
        <option>Sortie du nucléaire</option>
        <option>Acquis sociaux</option>
        <option>Démocratie</option>
      </select>
    </div>
    <div className="form-group">
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="voteRegistration"
        />
        <label className="form-check-label" htmlFor="voteRegistration">
          Enregistré sur les listes électorales
        </label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="help" />
        <label className="form-check-label" htmlFor="help">
          Besoin d'aide sur des questions adminitratives
        </label>
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="status">Jugement sur la France Insoumise ?</label>
      <select className="custom-select" defaultValue={null}>
        <option value={null}>Sélectionner un statut</option>
        <option>Neutre</option>
        <option>Sympathisant</option>
        <option>Militant</option>
        <option>Organisateur</option>
      </select>
    </div>
    <div className="form-check">
      <input type="checkbox" className="form-check-input" id="rgpdConsent" />
      <label className="form-check-label text-justify" htmlFor="rgpdConsent">
        ⚠️ La personne est renseignée sur ses droits en matière de données
        personnelles et du règlement général sur la protection des données
        (RGPD) et consent à ce que les données recueillies dans ce formulaire
        soient conservées et utilisées dans le cadre strict de la communication
        des groupes militants de la France Insoumise, dans la limite de 2 ans
        sauf si demande anticipée de suppression de ces dernières.
      </label>
    </div>
    <button className="btn btn-primary mt-3" type="submit">
      Enregistrer le contact
    </button>
  </form>;

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onSubmit: e => {
    e.preventDefault();
    console.log("submit");
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectForm);
