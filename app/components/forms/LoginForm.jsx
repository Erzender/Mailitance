import React from 'react';
import GenericForm from 'generic-form';
import { StyledFormField } from "./StyledFormField/StyledFormField";
import {accountLogin} from "../../redux/account/accountActions";
import {useDispatch} from "react-redux";
import {Button} from "../buttons/Button/Button";

export const LoginForm = () => {

  const dispatch = useDispatch();

  return <GenericForm onSubmit={(e, {username, password }) => {
    e.preventDefault();
    dispatch(accountLogin(username, password))
  }}>
    <StyledFormField type="text" name="username"/>
    <StyledFormField type="password" name="password"/>
    <Button>Connexion</Button>
  </GenericForm>
}