import {apiFetch} from "./asyncHelpers";


export const asyncContactsFetch = (groupId) =>
  apiFetch(`/group/${groupId}/contacts`, {
    method: 'GET'
  });

export const asyncContactsCreate = (group, contacts) =>
  apiFetch('/contacts', {
    method: 'POST',
    body: JSON.stringify({group, contacts})
  });

export const asyncContactsDelete = (contacts) =>
  apiFetch('/contacts', {
    method: 'DELETE',
    body: JSON.stringify({ contacts})
  });