import {asyncActionSuccess} from "../async/asyncHelpers";
import {asyncContactsCreate, asyncContactsDelete, asyncContactsFetch} from "../async/asyncContacts";

const PREFIX = 'CONTACTS';
export const CONTACTS_FETCH = `${PREFIX}/FETCH`;
export const CONTACTS_CREATE = `${PREFIX}/CREATE`;
export const CONTACTS_DELETE = `${PREFIX}/DELETE`;


export const contactsFetch = (groupId) => async dispatch => {
  dispatch({ type: CONTACTS_FETCH});
  const { success, contacts } = await asyncContactsFetch(groupId);
  dispatch({ type: asyncActionSuccess(CONTACTS_FETCH), contacts})
}

export const contactsCreate = (groupId, contacts) => async dispatch => {
  dispatch({ type: CONTACTS_CREATE });
  const { contacts: _contacts } = await asyncContactsCreate(groupId, contacts);
  dispatch({ type: asyncActionSuccess(CONTACTS_CREATE), contacts: _contacts });

}

export const contactsDelete = (contactsMailsOrPhones) => async dispatch => {
  dispatch({ type: CONTACTS_DELETE});
  await asyncContactsDelete(contactsMailsOrPhones)
  dispatch({ type: asyncActionSuccess(CONTACTS_DELETE), contactsMailsOrPhones });
}