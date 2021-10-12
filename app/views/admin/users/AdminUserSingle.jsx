import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectedUserSelector} from "../../../redux/users/usersSelector";
import {usersFetch, usersSetActivist, usersSetOperator} from "../../../redux/users/usersActions";
import GenericForm from "generic-form";
import { StyledFormField } from "../../../components/forms/StyledFormField/StyledFormField";
import {Button} from "../../../components/buttons/Button/Button";
import {selectedUserGroupsSelector} from "../../../redux/sharedSelectors";
import {groupsListSelector} from "../../../redux/groups/groupsSelectors";
import styles from '../../../components/forms/Form.module.css';
import {Table} from "../../../components/lists/Table/Table";

const roles = {
  'activist': 'Militant',
  'operator': 'Opérateur'
}

export const AdminUserSingle = ({ userId }) => {

  const user = useSelector(selectedUserSelector);
  const userGroups = useSelector(selectedUserGroupsSelector);
  const groups = useSelector(groupsListSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId)  dispatch(usersFetch(userId));
  }, [userId]);

  return user && userGroups ? <main>

    <h1>Utilisateur: {user.displayName}</h1>

    <h2>Groupes</h2>
    <Table>
      <thead>
      <th>Nom du groupe</th>
      <th>Rôle</th>
      </thead>
      <tbody>
      {

        userGroups.sort((a, b) => a.title - b.title).map(g =>
          <tr key={g.id}>
            <td>{g.title} </td><td>{roles[g.role]}</td>
          </tr>)
      }
      </tbody>
    </Table>

    <GenericForm id="admin-user-group-role" className={styles.bordered} onSubmit={(e, { group, role }) => {
      e.preventDefault();
      dispatch(
        role === 'activist'
        ? usersSetActivist(group, [userId])
        : usersSetOperator(group, [userId])
      );
    }
    }>
      <h3>Ajouter au groupe </h3>
      <StyledFormField formId="admin-user-group-role" label="Groupe" type="select" name="group" options={groups.map(g => ({ label : g.title, value: g.id}))}/>
      <StyledFormField formId="admin-user-group-role"  label="Rôle" type="select" name="role" options={[
        { label: 'Militant', value: 'activist'},
        { label: 'Opérateur', value: 'operator'}
      ]}/>
      <Button>Ajouter l'utilisateur au groupe</Button>
    </GenericForm>

  </main> : null;
}