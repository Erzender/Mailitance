import { apiFetch } from "./asyncHelpers";

export const asyncLogin = async (username, password) => {
  let res = await apiFetch("/login ", {
    method: "POST",
    body: JSON.stringify({
      username,
      password
    })
  });
  return res;
};

export const asyncAccountFetch = userId =>
  apiFetch("/account/" + userId, {
    method: "GET"
  });

export const asyncAccountCreate = (username, password, admin) =>
  apiFetch("/account", {
    method: "POST",
    body: JSON.stringify({ username, password, admin })
  });

export const asyncAccountUpdate = data =>
  apiFetch("/account", {
    method: "PATCH",
    body: JSON.stringify(data)
  });

export const asyncAccountFetchAll = () =>
  apiFetch("/account", {
    method: "GET"
  });
