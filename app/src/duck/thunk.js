import { fetchLogin } from "./service";

export const login = (username, password) => dispatch => {
  dispatch({ type: "LOGIN_REQUEST" });
  fetchLogin(username, password).then(res =>
    dispatch({ type: "LOGIN_RESOLVE", res })
  );
};
