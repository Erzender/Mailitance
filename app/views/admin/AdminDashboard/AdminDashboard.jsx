import React, { useEffect } from "react";
import GenericForm from "generic-form";
import { useRouter } from "next/router";
import { AdminNav } from "../../../components/layout/AdminNav/AdminNav";
import Head from "next/head";
import { ViewNav } from "../../../components/layout/ViewNav/ViewNav";
import { useDispatch, useSelector } from "react-redux";
import { usersFetchAll } from "../../../redux/users/usersActions";
import { usersListSelector } from "../../../redux/users/usersSelector";
import { UsersList } from "../../../components/lists/UsersList/UsersList";
import {
  loadedSelector,
  isAdminSelector
} from "../../../redux/account/accountSelectors";
import { GroupList } from "../../../components/lists/GroupList/GroupList";
import { groupsListSelector, selectedGroupSelector } from "../../../redux/groups/groupsSelectors";
import { StyledFormField } from "../../../components/forms/StyledFormField/StyledFormField";
import { Button } from "../../../components/buttons/Button/Button";
import {contactsDelete} from "../../../redux/contacts/contactsActions";

export const AdminDashboard = () => {
  const loaded = useSelector(loadedSelector);
  const dispatch = useDispatch();
  const users = useSelector(usersListSelector);
  const groups = useSelector(groupsListSelector);
  const admin = useSelector(isAdminSelector);
  const router = useRouter();
  const selectedGroup = useSelector(selectedGroupSelector);

  useEffect(() => {
    if (loaded) dispatch(usersFetchAll());
  }, [loaded]);

  return loaded ? (
    <main id="view-admin-dashboard">
      <Head>
        <title>Administration | Mailitance</title>
      </Head>
      {admin && (
        <div>
          <h2>Utilisateurs</h2>
          {users && <UsersList users={users} />}
          <h2>Groupes</h2>
          {groups && <GroupList groups={groups} />}
        </div>
      )}
      <h2>Supprimer un contact</h2>
      <GenericForm
        id="remove-contact-form"
        onSubmit={(e, { email }) => {
          e.preventDefault();
          dispatch(contactsDelete([email]));
          router.push(`/groupe/${selectedGroup.id}`);
        }}
      >
        <StyledFormField
          formId="remove-contact-form"
          validation={{ mandatory: true }}
          type="text"
          name="email"
          label="Email ou téléphone du contact à supprimer"
        />
        <Button>Supprimer le contact</Button>
      </GenericForm>
    </main>
  ) : null;
};
