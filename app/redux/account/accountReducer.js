import {asyncActionSuccess} from "../async/asyncHelpers";
import {ACCOUNT_LOGIN, ACCOUNT_LOGOUT} from "./accountActions";
import update from 'immutability-helper';
import {SHARED_INITIAL_FETCH} from "../sharedActions";

const initialState = {
  loaded: false,
  displayName: null,
  username: null,
  isLoggedIn: typeof window !== 'undefined' ? !!localStorage.getItem('token') : false,
  admin: false,
  userId: typeof window !== 'undefined' ? localStorage.getItem('userId'): null,
  militantGroups: [],
  operatingGroups: []
}

export default function accountReducer(state = initialState, action) {
  switch(action.type) {

    case asyncActionSuccess(ACCOUNT_LOGIN):
      return update(state, {
        isLoggedIn: { $set: true },
        admin: { $set: action.admin },
        userId: { $set: action.userId }
      });

    case asyncActionSuccess(SHARED_INITIAL_FETCH):
      return update(state, {
        $merge: {
          ...action.user,
          loaded: true
        }
      })

    case ACCOUNT_LOGOUT:
      return update(state, {
        loaded: { $set: false  },
        username: { $set: action.username },
        isLoggedIn: { $set: false },
      });

    default:
      return state;
  }
}
