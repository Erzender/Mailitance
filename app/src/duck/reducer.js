import { NAV_COLLECT } from "../const";

const initialState = {
  token: null,
  loginError: null,
  loginFetching: false,
  navbar: { mobileShow: false, modal: { open: false } },
  nav: { [NAV_COLLECT]: {} }
};

let token = localStorage.getItem("token");
if (!!token) {
  initialState.token = token;
}

const root = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loginFetching: true };
    case "LOGIN_RESOLVE":
      if (action.res.success) {
        localStorage.setItem("token", action.res.token);
      }
      return {
        ...state,
        token: action.res.success ? action.res.token : null,
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
