import { NAV_COLLECT } from "../const";

let storage = localStorage.getItem("app");
if (storage) {
  storage = JSON.parse(storage);
} else {
  storage = {};
}

const initialState = {
  initialized: false,
  token: !!storage.token ? storage.token : null,
  loginError: null,
  loginFetching: false,
  navbar: { mobileShow: false, modal: { open: false } },
  nav: { [NAV_COLLECT]: {} },
  groups: !!storage.groups ? storage.groups : null,
  user: !!storage.user ? storage.user : null,
  selectedGroup: !!storage.selectedGroup ? storage.selectedGroup : null
};

const root = (state = initialState, action) => {
  switch (action.type) {
    case "LOGOUT":
      localStorage.removeItem("app");
      return {
        ...initialState,
        token: null,
        groups: null,
        user: null,
        selectedGroup: null
      };
    case "LOGIN_REQUEST":
      return { ...state, loginFetching: true };
    case "LOGIN_RESOLVE":
      if (action.res.success) {
        storage = {
          ...storage,
          token: action.res.token,
          groups: action.res.groups,
          user: action.res.user
        };
        localStorage.setItem("app", JSON.stringify(storage));
      }
      return {
        ...state,
        token: action.res.success ? action.res.token : null,
        groups: action.res.groups,
        user: action.res.user,
        loginError: !action.res.success ? true : null,
        loginFetching: false
      };
    case "INIT_REQUEST":
      return { ...state, loginFetching: true };
    case "INIT_RESOLVE":
      if (action.res.success) {
        storage = { ...storage, groups: action.res.groups };
        localStorage.setItem("app", JSON.stringify(storage));
      }
      return {
        ...state,
        initialized: true,
        groups: action.res.groups,
        loginError: !action.res.success ? true : null,
        loginFetching: false
      };
    case "NAVBAR_TOGGLE_MODAL":
      return {
        ...state,
        navbar: {
          ...state.navbar,
          modal: {
            ...state.navbar.modal,
            open:
              action.value !== undefined
                ? action.value
                : !state.navbar.modal.open
          }
        }
      };
    case "NAVBAR_MOBILE_TOGGLE":
      return {
        ...state,
        navbar: { ...state.navbar, mobileShow: !state.navbar.mobileShow }
      };
    case "NAVBAR_NAV_TO":
      return {
        ...state,
        nav: action.route
      };
    case "NAVBAR_GROUP_CLICKED":
      storage = { ...storage, selectedGroup: action.group };
      localStorage.setItem("app", JSON.stringify(storage));
      return {
        ...state,
        selectedGroup: action.group,
        navbar: {
          ...state.navbar,
          modal: {
            ...state.navbar.modal,
            open: false
          }
        }
      };
    default:
      return state;
  }
};

export default root;
