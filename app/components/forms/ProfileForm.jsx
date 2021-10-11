import React from 'react';
import GenericForm from "generic-form";
import {StyledFormField} from "./StyledFormField/StyledFormField";
import {Button} from "../buttons/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {displayNameSelector, userIdSelector} from "../../redux/account/accountSelectors";
import {accountUpdate} from "../../redux/account/accountActions";

export const ProfileForm = () => {

  const userId = useSelector(userIdSelector)
  const displayName = useSelector(displayNameSelector);
  const dispatch = useDispatch();

  return displayName ? <GenericForm id="profile-form" onSubmit={(e, data) => {
    e.preventDefault();
    dispatch(accountUpdate({...data, id: userId}));
  }}>
    <StyledFormField formId="profile-form" label="Nom d'utilisateur" type="text" name="displayName" id="profile-form-displayName" value={displayName} />
    <StyledFormField formId="profile-form" label="Ancien mot de passe" type="password" name="previousPassword" id="profile-form-previous-password" />
    <StyledFormField formId="profile-form" label="Nouveau mot de passe" type="password" name="password" id="profile-form-password" />
    <Button>Mettre à jour</Button>
  </GenericForm> : null;
}