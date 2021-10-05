import { fetchLogin, fetchGroups, fetchUser, postContacts } from "./service";

export const login = (username, password) => dispatch => {
  dispatch({ type: "LOGIN_REQUEST" });
  fetchLogin(username, password).then(res => {
    if (!res.error) {
      fetchGroups(res.token).then(res2 => {
        fetchUser(res.token, res.userId).then(res3 => {
          dispatch({
            type: "LOGIN_RESOLVE",
            res: { ...res, ...res2, ...res3 }
          });
        });
      });
    }
  });
};

export const init = token => dispatch => {
  if (token) {
    dispatch({ type: "INIT_REQUEST" });

    fetchGroups(token).then(res => {
      dispatch({ type: "INIT_RESOLVE", res });
    });
  }
};

export const saveContact = (fields, group, token) => dispatch => {
  postContacts(token, group, [fields]).then(res => {
    console.log(res);
  });
};
