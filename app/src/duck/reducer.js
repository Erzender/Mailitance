const initialState = {
  navbar: { mobileShow: false, modal: { open: false } },
};

const root = (state = initialState, action) => {
  switch (action.type) {
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
                : !state.navbar.modal.open,
          },
        },
      };
    case "NAVBAR_MOBILE_TOGGLE":
      return {
        ...state,
        navbar: { ...state.navbar, mobileShow: !state.navbar.mobileShow },
      };
    default:
      return state;
  }
};

export default root;
