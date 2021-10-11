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

export const asyncGroupAddActivist= () =>
  apiFetch('/groupMilitants', {
    method: 'POST'
  })

export const asyncGroupAddOperator = () =>
  apiFetch('/groupMilitants', {
    method: 'POST'
  })