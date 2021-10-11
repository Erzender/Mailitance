import {asyncActionSuccess} from "../async/asyncHelpers";
import update from 'immutability-helper';
import {GROUPS_CREATE, GROUPS_FETCH, GROUPS_MEMBERS_FETCH, GROUPS_SELECT} from "./groupsActions";
import {SHARED_INITIAL_FETCH} from "../sharedActions";

const initialState = {
  list: [],
  loaded: false,
  selected: null
}

export default function groupReducer(state = initialState, action) {
  switch(action.type) {

    case asyncActionSuccess(SHARED_INITIAL_FETCH):
    case asyncActionSuccess(GROUPS_FETCH):
      return update(state, {
        list: { $set: action.groups },
        selected: { $set: action.groups.length ? action.groups[0].id : state.selected },
        loaded: { $set: true }
      });

    case asyncActionSuccess(GROUPS_CREATE):
      return update(state, {
        list: {
          $push: [{
            id: action.groupId,
            title: action.title,
            parent: action.parentGroup,
            level: action.parentGroup ? state.list.find(({id}) => id === action.parentGroup).level +1 : 0
          }]
        }
      });

    case GROUPS_SELECT:
      return update(state, {
        selected: { $set: action.id }
      });

    case asyncActionSuccess(GROUPS_MEMBERS_FETCH): {
      const groupIndex = state.list.findIndex(g => g.id === action.groupId);
      console.log(state.list.length, action)
      if (groupIndex<0) return state;
      console.log('tot')
      return update(state, {
        list: {
          [groupIndex]: { $merge: { operators: action.operators, militants :action.militants} }
        }
      });
    }

    default:
      return state;
  }
}
