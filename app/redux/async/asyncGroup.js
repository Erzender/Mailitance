import {apiFetch} from "./asyncHelpers";


export const asyncGroupFetch = () =>
  apiFetch('/group', {
    method: 'GET'
  });

export const asyncGroupMembersFetch = (groupId) =>
  apiFetch(`/group/${groupId}/members`, {
    method: 'GET'
  })

export const asyncGroupCreate = (title, parentGroup) =>
  apiFetch('/group', {
    method: 'POST',
    body: JSON.stringify({
      title,
      parentGroup
    })
  })

export const asyncGroupAddActivist= (groupId, userIds) =>
  apiFetch('/groupMilitants', {
    method: 'POST',
    body: JSON.stringify({
      group: groupId,
      users: userIds
    })
  })

export const asyncGroupAddOperator = (groupId, userIds) =>
  apiFetch('/groupOperators', {
    method: 'POST',
    body: JSON.stringify({
      group: groupId,
      users: userIds
    })
  })