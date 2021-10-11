import React from 'react';
import {useLoggedIn} from "../../../hooks/useLoggedIn";
import {AdminUsersCreate} from "../../../views/admin/users/AdminUsersCreate";

export default function AdminGroupsCreatePage () {
  useLoggedIn();
  return <AdminUsersCreate />;
}