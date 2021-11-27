import {asyncAccountFetch} from "./async/asyncAccount";
import {asyncGroupFetch} from "./async/asyncGroup";
import {asyncActionSuccess} from "./async/asyncHelpers";

const prefix = 'SHARED';

export const SHARED_INITIAL_FETCH = `${prefix}/INITIAL_FETCH `;

export const sharedInitialFetch = (userId) => async dispatch => {
  dispatch({ type : SHARED_INITIAL_FETCH });
  const { user } = await asyncAccountFetch(userId);
  console.log(user);
  const { success, groups } = await asyncGroupFetch();
  dispatch({ type : asyncActionSuccess(SHARED_INITIAL_FETCH), user, groups });
}