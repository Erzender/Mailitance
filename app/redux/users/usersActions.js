import {asyncAccountFetch, asyncAccountFetchAll} from "../async/asyncAccount";
import {asyncActionSuccess} from "../async/asyncHelpers";

const PREFIX = 'USERS';

export const USERS_FETCH = `${PREFIX}/FETCH`;
export const USERS_FETCH_ALL = `${PREFIX}/FETCH_ALL`;

export const usersFetchAll = () => async dispatch => {
  dispatch({ type: USERS_FETCH_ALL })
  const { users } = await asyncAccountFetchAll();;
  dispatch({ type: asyncActionSuccess(USERS_FETCH_ALL), users })
}

export const usersFetch = (userId) => async dispatch => {
  dispatch({ type : USERS_FETCH })
  const {user} = await asyncAccountFetch(userId);
  dispatch({ type : asyncActionSuccess(USERS_FETCH), user });
}