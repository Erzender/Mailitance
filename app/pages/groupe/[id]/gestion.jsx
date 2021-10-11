import React from 'react';
import {useRouter} from "next/router";
import {GroupManagement} from "../../../views/group/GroupManagement/GroupManagement";
import {useLoggedIn} from "../../../hooks/useLoggedIn";

export default function GroupManagementPage() {
  useLoggedIn();
  const { query } = useRouter();
  return <GroupManagement groupId={query.id} />
}