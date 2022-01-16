import {asyncActionSuccess} from "../async/asyncHelpers";
import update from 'immutability-helper';
import {CONTACTS_CREATE, CONTACTS_DELETE, CONTACTS_FETCH} from "./contactsActions";

const initialState = {
  list: [],
  loaded: false
}

export default function groupReducer(state = initialState, action) {
  switch(action.type) {

    case asyncActionSuccess(CONTACTS_FETCH):
      return update(state, {
        list: { $set: action.contacts }
      })

    case asyncActionSuccess(CONTACTS_CREATE):
      return update(state, {
        list: { $push: action.contacts }
      })

    case asyncActionSuccess(CONTACTS_DELETE):
      if (!state.list) {
        return;
      }
      return update(state, {
        list: { $set: state.list.filter(c => !action.contactsMailsOrPhones.includes(c.email) && !action.contactsMailsOrPhones.includes(c.phone)) }
      })

    default:
      return state;
  }
}
