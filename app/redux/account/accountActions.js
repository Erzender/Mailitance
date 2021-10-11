import {asyncAccountCreate, asyncAccountFetch, asyncLogin} from "../async/asyncAccount";
import {asyncActionSuccess} from "../async/asyncHelpers";

const PREFIX = 'ACCOUNT';
export const ACCOUNT_LOGIN = `${PREFIX}/LOGIN`;
export const ACCOUNT_FETCH = `${PREFIX}/FETCH`;
export const ACCOUNT_FETCH_ALL = `${PREFIX}/FETCH_ALL`;
export const ACCOUNT_LOGOUT = `${PREFIX}/LOGOUT`;
export const ACCOUNT_CREATE = `${PREFIX}/CREATE`;


export const accountLogin = (username, password) => async dispatch => {
  dispatch({ type: ACCOUNT_LOGIN});
  const { success, token, admin, userId } = await asyncLogin(username, password);
  if (!success) throw new Error('Login Failed');
  localStorage.setItem('userId', userId);
  localStorage.setItem('token', token);
  localStorage.setItem('admin', admin);
  dispatch({ type: asyncActionSuccess(ACCOUNT_LOGIN), username, admin, userId})

}

export const accountFetch = (userId) => async dispatch => {
  dispatch({type: ACCOUNT_FETCH });
  console.log(userId)
  const { user } =await asyncAccountFetch(userId);
  dispatch({type: asyncActionSuccess(ACCOUNT_FETCH), militantGroups: user.militantGroups, operatingGroups: user.operatingGroups , username: user.username});
}

export const accountLogout = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('token');
  localStorage.removeItem('admin');
  return {
    type: ACCOUNT_LOGOUT
  }
}

export const accountCreate = (username, password, admin) => async dispatch => {
  dispatch({ type: ACCOUNT_CREATE});
  await asyncAccountCreate(username, password, admin);
}