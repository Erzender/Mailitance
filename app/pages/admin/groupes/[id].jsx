import React, {useEffect} from 'react';
import {useLoggedIn} from "../../../hooks/useLoggedIn";
import {AdminGroupsManage} from "../../../views/admin/groups/AdminGroupsManage";

export default function AdminUsersSinglePage () {
  useLoggedIn();
  return <AdminGroupsManage />
}