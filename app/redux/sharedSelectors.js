import {selectedUserSelector} from "./users/usersSelector";
import {groupsListSelector, selectedGroupSelector} from "./groups/groupsSelectors";
import pipe from "lodash/fp/pipe";
import {operatingGroupsSelector} from "./account/accountSelectors";

export const selectedUserGroupsSelector =  state => {
  const user = selectedUserSelector(state);
  if (!user) return null;
   const {operatingGroups, militantGroups } = user;
  const groups = groupsListSelector(state)

  return (groups || []).filter(g => operatingGroups.includes(g.id) || militantGroups.includes(g.id)).map(g => {
    g.role = operatingGroups.includes(g.id) ? 'operator' : 'activist';
    return g;
  })
}

export const isOperatorSelector = state => {
  const operatingGroups = operatingGroupsSelector(state);
  const group = selectedGroupSelector(state);
  if (!group) return false;
  return operatingGroups.includes(group.id);
}

export const isSelectedGroupOperatorSelector = state => {
  const user = selectedUserSelector(state);
  const group = selectedGroupSelector(state);
  if (!group) return false;
  return user?.operatingGroups.includes(group.id);
}