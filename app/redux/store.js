import {createStore, applyMiddleware, combineReducers, compose} from "redux"
import account from './account/accountReducer';
import groups from './groups/groupsReducer';
import contacts from './contacts/contactsReducer';
import modal from './modal/modalReducer';
import users from './users/usersReducer';
import thunk from "redux-thunk"

const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  combineReducers({
    account,
    contacts,
    groups,
    modal,
    users
  }),
  composeEnhancers(
    applyMiddleware(thunk)
  )
)