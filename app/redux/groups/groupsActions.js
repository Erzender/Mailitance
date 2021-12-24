import {asyncActionSuccess} from "../async/asyncHelpers";
import {
  asyncGroupAddActivist,
  asyncGroupAddOperator,
  asyncGroupCreate,
  asyncGroupFetch,
  asyncGroupMembersFetch
} from "../async/asyncGroup";

const PREFIX = 'GROUPS';
export const GROUPS_FETCH = `${PREFIX}/FETCH`;
export const GROUPS_CREATE = `${PREFIX}/CREATE`;
export const GROUPS_SELECT = `${PREFIX}/SELECT`;
export const GROUPS_MEMBERS_FETCH = `${PREFIX}/MEMBERS_FETCH`;
export const GROUPS_ADD_ACTIVIST = `${PREFIX}/ADD_ACTIVIST`;
export const GROUPS_ADD_OPERATOR = `${PREFIX}/ADD_OPERATOR`;


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

export const groupAddActivist = (groupId, users) => async dispatch => {
  groupId= parseInt(groupId);
  dispatch({ type: GROUPS_ADD_ACTIVIST });
  const {} = asyncGroupAddActivist(groupId, users.map(u => u.id));
  dispatch({ type: asyncActionSuccess(GROUPS_ADD_ACTIVIST), groupId, users })
}

export const groupAddOperator = (groupId, users) => async dispatch => {
  groupId= parseInt(groupId);
  dispatch({ type: GROUPS_ADD_OPERATOR });
  const {} = asyncGroupAddOperator(groupId, users.map(u => u.id));
  dispatch({ type: asyncActionSuccess(GROUPS_ADD_OPERATOR), groupId, users })
}