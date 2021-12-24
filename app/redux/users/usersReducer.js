import {asyncActionSuccess} from "../async/asyncHelpers";
import {USERS_FETCH, USERS_FETCH_ALL, USERS_SET_ACTIVIST} from "./usersActions";
import update from "immutability-helper";

const initialState = {
  list: null,
  loaded: false,
  selected: null
}

export default function usersReducer(state = initialState, action) {

  switch(action.type) {

    case asyncActionSuccess(USERS_FETCH_ALL):
      return update(state, {
        list: { $set: action.users},
        loaded: {$set: true}
      })

    case asyncActionSuccess(USERS_FETCH):
      return update(state, {
        selected: { $set: action.user}
      })

    default:
      return state;
  }

}