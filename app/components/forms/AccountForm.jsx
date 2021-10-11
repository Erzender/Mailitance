import React from 'react';
import GenericForm from "generic-form";
import  { StyledFormField} from './StyledFormField/StyledFormField';
import {useDispatch, useSelector} from "react-redux";
import {Button} from "../buttons/Button/Button";
import {isAdminSelector} from "../../redux/account/accountSelectors";
import {accountCreate} from "../../redux/account/accountActions";

export const AccountForm = () => {

  const dispatch = useDispatch();
  const admin = useSelector(isAdminSelector);

  return <GenericForm id="account-form" onSubmit={(e, { username, password, admin }) => {
    e.preventDefault();
    dispatch(accountCreate(username, password, admin));
  }}>
    <StyledFormField formId="account-form" type="username" name="username" label="Nom d'utilisateur" validation={{ mandatory: true}}/>
    <StyledFormField formId="account-form" type="password" name="password" label="Mot de passe" validation={{ mandatory: true}}/>
    {admin && <StyledFormField formId="account-form" id="account-form-admin" type="checkbox" name="admin" label="Administrateur" />}
    <Button>Créer l'utilisateur</Button>
  </GenericForm>;

}