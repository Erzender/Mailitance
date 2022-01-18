import React from "react";
import GenericForm from "generic-form";
import { StyledFormField } from "./StyledFormField/StyledFormField";
import { useDispatch, useSelector } from "react-redux";
import { groupsListSelector } from "../../redux/groups/groupsSelectors";
import { Button } from "../buttons/Button/Button";
import { contactsCreate } from "../../redux/contacts/contactsActions";
import { useRouter } from "next/router";
import { FiAlertTriangle } from "react-icons/fi";
import { statusOptions, topics, details, agesOptions } from '../../constants';


export const ContactForm = ({ groupId }) => {
  const dispatch = useDispatch();
  const groups = useSelector(groupsListSelector);
  const router = useRouter();

  return (
    <GenericForm
      id="form-contact"
      onSubmit={(e, data) => {
        e.preventDefault();
        if (!data.topics) data.topics = [];
        if (!Array.isArray(data.topics)) data.topics = [data.topics];
        if (!data.detail) data.detail = [];
        if (!Array.isArray(data.detail)) data.detail = [data.detail];
        if (data.help === "-1") data.help = undefined;
        if (data.voteRegistration === "-1") data.voteRegistration = undefined;
        if (data.age > -1) data.age = parseInt(data.age);
        else data.age = undefined;
        if (data.status > -1) data.status = parseInt(data.status);
        else data.status = undefined;
        dispatch(contactsCreate(groupId, [data]));
        router.push(`/groupe/${groupId}`);
      }}
    >
      <StyledFormField
        formId="form-contact"
        type="text"
        name="lastname"
        label="Nom"
        validation={{ mandatory: false }}
      />
      <StyledFormField
        formId="form-contact"
        type="text"
        name="firstname"
        label="Prénom"
        validation={{ mandatory: false }}
      />
      <StyledFormField
        formId="form-contact"
        type="email"
        name="email"
        label="E-mail"
        validation={{ mandatory: true }}
      />
      <StyledFormField
        formId="form-contact"
        type="tel"
        name="phone"
        label="Téléphone"
        validation={{ mandatory: false }}
      />
      <StyledFormField
        formId="form-contact"
        type="select"
        name="age"
        label="Age"
        options={agesOptions}
      />
      <StyledFormField
        formId="form-contact"
        type="address"
        name="address"
        label="Adresse"
        validation={{ mandatory: false }}
      />
      <StyledFormField
        formId="form-contact"
        type="text"
        name="district"
        label="Quartier"
        validation={{ mandatory: false }}
      />
      <StyledFormField
        formId="form-contact"
        type="voteSector"
        name="voteSector"
        label="Secteur électoral"
        validation={{ mandatory: false }}
      />

      <fieldset>
        <legend>Sujets d'intérêt</legend>
        {topics.map((topic) => (
          <StyledFormField
            formId="form-contact"
            type="checkbox"
            name="topics"
            id={`topic-${topic}`}
            key={`topic-${topic}`}
            value={topic}
            label={topic}
          />
        ))}
      </fieldset>

      <StyledFormField
        formId="form-contact"
        type="select"
        name="voteRegistration"
        id="form-content-voteRegistration"
        label="Enregistré sur les listes électorales"
        options={[
          {
            label: "Non renseigné",
            value: -1
          },
          { label: "Non", value: false },
          { label: "Oui", value: true }
        ]}
      />
      <StyledFormField
        formId="form-contact"
        type="select"
        name="help"
        id="form-content-help"
        label="Besoin d'aide sur des questions administratives"
        options={[
          {
            label: "Non renseigné",
            value: -1
          },
          { label: "Non", value: false },
          { label: "Oui", value: true }
        ]}
      />
      <StyledFormField
        formId="form-contact"
        type="select"
        name="status"
        label="Jugement sur la France Insoumise"
        options={statusOptions}
      />

      <fieldset>
        <legend>Autres</legend>
        {details.map((detail) => (
          <StyledFormField
            formId="form-contact"
            type="checkbox"
            name="detail"
            id={`detail-${detail}`}
            key={`detail-${detail}`}
            value={detail}
            label={detail}
          />
        ))}
      </fieldset>

      <StyledFormField
        formId="form-contact"
        type="textarea"
        name="comment"
        label="Remarques"
        validation={{ mandatory: false }}
      />
    
      <StyledFormField
        formId="form-contact"
        type="checkbox"
        name="rgpdConsent"
        id="rgpdConsent"
        validation={{ mandatory: true }}
        label={
          <>
            <FiAlertTriangle /> La personne est renseignée sur ses droits en
            matière de données personnelles et du règlement général sur la
            protection des données (RGPD) et consent à ce que les données
            recueillies dans ce formulaire soient conservées et utilisées dans
            le cadre strict de la communication des groupes militants de la
            France Insoumise, dans la limite de 2 ans sauf si demande anticipée
            de suppression de ces dernières.
          </>
        }
      />

      <Button>Créer le contact</Button>
    </GenericForm>
  );
};
