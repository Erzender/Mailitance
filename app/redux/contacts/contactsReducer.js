import {asyncActionSuccess} from "../async/asyncHelpers";
import update from 'immutability-helper';
import {CONTACTS_CREATE, CONTACTS_FETCH} from "./contactsActions";

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
      update(state, {
        list: { $push: action.contacts }
      })

    default:
      return state;
  }
}
