import React from 'react';
import {useRouter} from "next/router";
import {useLoggedIn} from "../../../hooks/useLoggedIn";
import { Group } from "../../../views/group/Group/Group";

export default function GroupSingleUserPage() {
  useLoggedIn();
  const { query } = useRouter()
  return <Group groupId={query.id} />;
}