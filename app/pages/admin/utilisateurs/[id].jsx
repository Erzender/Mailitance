import React from 'react';
import {useLoggedIn} from "../../../hooks/useLoggedIn";
import {useRouter} from "next/router";
import {AdminUserSingle} from "../../../views/admin/users/AdminUserSingle";

export default function AdminUsersSinglePage () {
  useLoggedIn();
  const { query } = useRouter()
  return <AdminUserSingle userId={query.id} />;
}