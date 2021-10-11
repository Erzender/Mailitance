import React from 'react';
import { AdminDashboard } from "../../views/admin/AdminDashboard/AdminDashboard";
import {useLoggedIn} from "../../hooks/useLoggedIn";

export default function AdminIndexPage () {
  useLoggedIn();
  return <AdminDashboard />;
}