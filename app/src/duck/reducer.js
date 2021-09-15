import { NAV_COLLECT } from "../const";

const token = localStorage.getItem("token");
const groups = JSON.parse(localStorage.getItem("groups"));
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  initialized: false,
  token: !!token ? token : null,
  loginError: null,
  loginFetching: false,
  navbar: { mobileShow: false, modal: { open: false } },
  nav: { [NAV_COLLECT]: {} },
  groups: !!groups ? groups : null,
  user: !!user ? user : null
};

const root = (state = initialState, action) => {
  switch (action.type) {
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("groups");
      localStorage.removeItem("user");
      return { ...initialState, token: null, groups: null, user: null };
    case "LOGIN_REQUEST":
      return { ...state, loginFetching: true };
    case "LOGIN_RESOLVE":
      if (action.res.success) {
        localStorage.setItem("token", action.res.token);
        localStorage.setItem("groups", JSON.stringify(action.res.groups));
        localStorage.setItem("user", JSON.stringify(action.res.user));
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
        localStorage.setItem("groups", JSON.stringify(action.res.groups));
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
    default:
      return state;
  }
};

export default root;
