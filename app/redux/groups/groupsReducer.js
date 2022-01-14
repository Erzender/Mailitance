import {asyncActionSuccess} from "../async/asyncHelpers";
import update from 'immutability-helper';
import {
  GROUPS_ADD_ACTIVIST,
  GROUPS_ADD_OPERATOR,
  GROUPS_CREATE,
  GROUPS_FETCH,
  GROUPS_MEMBERS_FETCH,
  GROUPS_SELECT
} from "./groupsActions";
import {SHARED_INITIAL_FETCH} from "../sharedActions";


const initialState = {
  list: [],
  loaded: false,
  selected: null
}

export default function groupReducer(state = initialState, action) {
  switch (action.type) {
    case asyncActionSuccess(SHARED_INITIAL_FETCH):
    case asyncActionSuccess(GROUPS_FETCH): {
      const list = action.groups.map(g => ({ ...g, militants: g.militants || [], operators: g.operators || []}));


      let selected = list[0].id ;
        const g = window.localStorage.getItem('group');
        if (g) selected = parseInt(g);

      return update(state, {
        list: {$set: list},
        selected: {$set: list.length ? selected: state.selected},
        loaded: {$set: true}
      });
    }

    case asyncActionSuccess(GROUPS_CREATE):
      return update(state, {
        list: {
          $push: [{
            id: action.groupId,
            title: action.title,
            parent: action.parentGroup,
            level: action.parentGroup ? state.list.find(({id}) => id === action.parentGroup).level + 1 : 0
          }]
        }
      });

    case GROUPS_SELECT:
      window.localStorage.setItem('group', action.id);
      return update(state, {
        selected: {$set: action.id}
      });

    case asyncActionSuccess(GROUPS_MEMBERS_FETCH): {
      const groupIndex = state.list.findIndex(g => g.id === action.groupId);
      if (groupIndex < 0) return state;
      return update(state, {
        list: {
          [groupIndex]: {$merge: {operators: action.operators, militants: action.militants}}
        }
      });
    }

    case asyncActionSuccess(GROUPS_ADD_ACTIVIST): {
      const groupIndex = state.list.findIndex(g => g.id === action.groupId);
      if (groupIndex < 0) return state;
      console.log(action)
      return update(state, {
        list: {
          [groupIndex]: {
            militants: {
              $push: action.users
            }
          }
        }
      })
    }

    case asyncActionSuccess(GROUPS_ADD_OPERATOR): {
      const groupIndex = state.list.findIndex(g => g.id === action.groupId);
      if (groupIndex < 0) return state;
      return update(state, {
        list: {
          [groupIndex]: {
            operators: {
              $push: action.users
            }
          }
        }
      })
    }

    default:
      return state;
  }
}
