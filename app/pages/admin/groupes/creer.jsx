import React from 'react';
import {AdminGroupsCreate} from "../../../views/admin/groups/AdminGroupsCreate";
import {useLoggedIn} from "../../../hooks/useLoggedIn";

export default function AdminGroupsCreatePage () {
  useLoggedIn();
  return <AdminGroupsCreate />;
}