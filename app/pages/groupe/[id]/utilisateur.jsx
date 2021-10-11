import React from 'react';
import {useRouter} from "next/router";
import {useLoggedIn} from "../../../hooks/useLoggedIn";
import { GroupUser } from "../../../views/group/GroupUser/GroupUser";

export default function GroupSingleUserPage() {
  useLoggedIn();
  const { query } = useRouter()
  return <GroupUser groupId={query.id} />;
}