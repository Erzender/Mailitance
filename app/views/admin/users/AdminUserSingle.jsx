import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectedUserSelector} from "../../../redux/users/usersSelector";
import {usersFetch} from "../../../redux/users/usersActions";
import {groupsListSelector} from "../../../redux/groups/groupsSelectors";
import GenericForm from "generic-form";
import { StyledFormField } from "../../../components/forms/StyledFormField/StyledFormField";
import {Button} from "../../../components/buttons/Button/Button";

export const AdminUserSingle = ({ userId }) => {

  const user = useSelector(selectedUserSelector);
  const groups = useSelector(groupsListSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId)  dispatch(usersFetch(userId));
  }, [userId]);

  return user ? <main>

    <h1>{user.displayName}</h1>

    <h2>Groupes</h2>
    <ul>
      {

        [...user.militantGroups.map(g => ({ role: 'Militant', ...g})), ...user.operatingGroups.map(g => ({ role: 'Opérateur', ...g}))].sort((a, b) => a.title - b.title).map(g =>
        <li key={g.id}>
          {g.title}
        </li>)
      }
    </ul>

    <h2>Ajouter au groupe </h2>
    <GenericForm>
      <StyledFormField label="Groupe" type="select" options={groups.map(g => ({ label : g.title, value: g.id}))}/>
      <StyledFormField label="Rôle" type="select" options={[
        { label: 'Militant', value: 'militant'},
        { label: 'Opérateur', value: 'operator'}
      ]}/>
      <Button>Ajouter l'utilisateur au groupe</Button>
    </GenericForm>

  </main> : null;
}