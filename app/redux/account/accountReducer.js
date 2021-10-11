import {asyncActionSuccess} from "../async/asyncHelpers";
import {ACCOUNT_LOGIN, ACCOUNT_LOGOUT} from "./accountActions";
import update from 'immutability-helper';

const initialState = {
  username: null,
  isLoggedIn: typeof window !== 'undefined' ? !!localStorage.getItem('token') : false,
  admin: typeof window !== 'undefined' ? localStorage.getItem('admin') === 'true' : false,
  userId: typeof window !== 'undefined' ? localStorage.getItem('userId'): null,
  militantGroups: null,
  operatingGroups: null
}

export default function accountReducer(state = initialState, action) {
  switch(action.type) {

    case asyncActionSuccess(ACCOUNT_LOGIN):
      return update(state, {
        username: { $set: action.username },
        isLoggedIn: { $set: true },
        admin: { $set: action.admin },
        userId: { $set: action.userId }
      });

    case ACCOUNT_LOGOUT:
      return update(state, {
        username: { $set: action.username },
        isLoggedIn: { $set: false },
        militantGroups: { $set: action.militantGroups },
        operatingGroups: { $set: action.operatingGroups }
      });

    default:
      return state;
  }
}
