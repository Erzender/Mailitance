import React from 'react';
import GenericForm from "generic-form";
import {StyledFormField} from "./StyledFormField/StyledFormField";
import {Button} from "../buttons/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {usersListSelector} from "../../redux/users/usersSelector";
import {groupAddActivist} from "../../redux/groups/groupsActions";

export const ActivistForm = ({ className, groupId, title }) => {
  const users = useSelector(usersListSelector)
  const dispatch = useDispatch();

  return users?.length ? <GenericForm id="activist-form" className={className} onSubmit={(e, data) => {
    e.preventDefault();
    dispatch( groupAddActivist(groupId, [users.find(u => u.id === parseInt(data.userId))]))
  }}>
    {title && <h3>{title}</h3>}
    <StyledFormField formId="activist-form" label="Utilisateur" name="userId" type="select" options={users.map(u => ({ label: u.displayName, value: u.id}))} />
    <Button>Ajouter un militant</Button>
  </GenericForm> : null;
}