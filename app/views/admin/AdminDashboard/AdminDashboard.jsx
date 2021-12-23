import React, {useEffect} from 'react';
import {AdminNav} from "../../../components/layout/AdminNav/AdminNav";
import Head from "next/head";
import {ViewNav} from "../../../components/layout/ViewNav/ViewNav";
import {useDispatch, useSelector} from "react-redux";
import {usersFetchAll} from "../../../redux/users/usersActions";
import {usersListSelector} from "../../../redux/users/usersSelector";
import {UsersList} from "../../../components/lists/UsersList/UsersList";
import {loadedSelector} from "../../../redux/account/accountSelectors";
import {GroupList} from "../../../components/lists/GroupList/GroupList";
import {groupsListSelector} from "../../../redux/groups/groupsSelectors";

export const AdminDashboard = () => {

  const loaded = useSelector(loadedSelector)
  const dispatch = useDispatch();
  const users = useSelector(usersListSelector);
  const groups = useSelector(groupsListSelector)

  useEffect(() => {
    if (loaded) dispatch(usersFetchAll());
  }, [loaded]);

  return loaded ? <main id="view-admin-dashboard">
    <Head>
      <title>Administration | Mailitance</title>
    </Head>

    <h2>Utilisateurs</h2>
    {users && <UsersList users={users} />}
    <h2>Groupes</h2>
    {groups && <GroupList groups={groups} />}
  </main> : null;
}