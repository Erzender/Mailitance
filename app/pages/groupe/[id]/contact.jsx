import React from 'react';
import {useRouter} from "next/router";
import {useLoggedIn} from "../../../hooks/useLoggedIn";
import { GroupContact } from "../../../views/group/GroupContact/GroupContact";

export default function GroupSingleUserPage() {
  useLoggedIn();
  const { query } = useRouter()
  return <GroupContact groupId={query.id} />;
}