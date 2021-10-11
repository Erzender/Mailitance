import {asyncAccountFetch, asyncAccountFetchAll} from "../async/asyncAccount";
import {asyncActionSuccess} from "../async/asyncHelpers";
import {asyncGroupAddActivist, asyncGroupAddOperator} from "../async/asyncGroup";

const PREFIX = 'USERS';

export const USERS_FETCH = `${PREFIX}/FETCH`;
export const USERS_FETCH_ALL = `${PREFIX}/FETCH_ALL`;
export const USERS_SET_ACTIVIST = `${PREFIX}/SET_ACTIVIST`;
export const USERS_SET_OPERATOR = `${PREFIX}/SET_OPERATOR`;

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

export const usersSetActivist = (groupId, userIds) => async dispatch => {
  dispatch({ type: USERS_SET_ACTIVIST });
  const {} = asyncGroupAddActivist(groupId, userIds);
  dispatch({ type: asyncActionSuccess(USERS_SET_ACTIVIST), groupId, userIds })
}

export const usersSetOperator = (groupId, userIds) => async dispatch => {
  dispatch({ type: USERS_SET_OPERATOR });
  const {} = asyncGroupAddOperator(groupId, userIds);
  dispatch({ type: asyncActionSuccess(USERS_SET_OPERATOR), groupId, userIds })
}