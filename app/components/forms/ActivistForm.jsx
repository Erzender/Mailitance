import React from 'react';
import GenericForm from "generic-form";
import {StyledFormField} from "./StyledFormField/StyledFormField";
import {Button} from "../buttons/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {usersListSelector} from "../../redux/users/usersSelector";
import {usersSetActivist, usersSetOperator} from "../../redux/users/usersActions";

export const ActivistForm = ({ groupId }) => {
  const users = useSelector(usersListSelector)
  const dispatch = useDispatch();

  return users?.length ? <GenericForm id="activist-form" onSubmit={(e, data) => {
    e.preventDefault();
    dispatch( usersSetActivist(groupId, [parseInt(data.userId)]))
  }}>
    <StyledFormField formId="activist-form" label="Utilisateur" name="userId" type="select" options={users.map(u => ({ label: u.displayName, value: u.id}))} />
    <Button>Ajouter un militant</Button>
  </GenericForm> : null;
}