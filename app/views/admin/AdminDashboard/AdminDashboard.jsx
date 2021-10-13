import React, {useEffect} from 'react';
import {AdminNav} from "../../../components/layout/AdminNav/AdminNav";
import Head from "next/head";
import {ViewNav} from "../../../components/layout/ViewNav/ViewNav";
import {useDispatch, useSelector} from "react-redux";
import {usersFetchAll} from "../../../redux/users/usersActions";
import {usersListSelector} from "../../../redux/users/usersSelector";
import {UsersList} from "../../../components/lists/UsersList/UsersList";
import {loadedSelector} from "../../../redux/account/accountSelectors";

export const AdminDashboard = () => {

  const loaded = useSelector(loadedSelector)
  const dispatch = useDispatch();
  const users = useSelector(usersListSelector);

  useEffect(() => {
    if (loaded) dispatch(usersFetchAll());
  }, [loaded]);

  return loaded ? <main id="view-admin-dashboard">
    <Head>
      <title>Administration | Mailitance</title>
    </Head>

    {users && <UsersList users={users} />}
  </main> : null;
}