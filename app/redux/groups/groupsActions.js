import {asyncActionSuccess} from "../async/asyncHelpers";
import {asyncGroupCreate, asyncGroupFetch, asyncGroupMembersFetch} from "../async/asyncGroup";

const PREFIX = 'GROUPS';
export const GROUPS_FETCH = `${PREFIX}/FETCH`;
export const GROUPS_CREATE = `${PREFIX}/CREATE`;
export const GROUPS_SELECT = `${PREFIX}/SELECT`;
export const GROUPS_MEMBERS_FETCH = `${PREFIX}/MEMBERS_FETCH`;


export const groupsFetch = () => async dispatch => {
  dispatch({ type: GROUPS_FETCH});
  const { success, groups } = await asyncGroupFetch();
  dispatch({ type: asyncActionSuccess(GROUPS_FETCH), groups})
}

export const groupCreate = (title, parentGroup) => async dispatch => {
  dispatch({ type:GROUPS_CREATE });
  const { success, groupId } = await asyncGroupCreate(title, parentGroup);
  dispatch({ type: asyncActionSuccess(GROUPS_CREATE), groupId, title, parentGroup});
}

export const groupSelect = (id) => ({
  type: GROUPS_SELECT,
  id
});

export const groupMembersFetch = (groupId) => async dispatch => {
  groupId = parseInt(groupId);
  dispatch({ type: GROUPS_MEMBERS_FETCH });
  const { militants, operators } = await asyncGroupMembersFetch(groupId);
  dispatch({type: asyncActionSuccess(GROUPS_MEMBERS_FETCH), groupId,  militants, operators})
}