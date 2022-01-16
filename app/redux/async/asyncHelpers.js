import { store } from "../store";
import { accountLogout, accountLoginError } from "../account/accountActions";

export const apiFetch = async (url, options) => {
  let r = await fetch(
    url.startsWith("http")
      ? url
      : `${process.env.NEXT_PUBLIC_API_HOST}/api/${url.replace(/^\//, "")}`,
    {
      ...options,
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "content-type": "application/json",
        ...(options.headers || {})
      }
    }
  );

  if (r.status < 299) return r.json();
  let err = await r.text();


  switch (err) {
    case "invalid_token":
      store.dispatch(accountLogout());
      return {};
    default:
      return { success: false, err };
  }
  return r;
};

export const asyncActionSuccess = action => `${action}/SUCCESS`;
export const asyncActionError = action => `${action}/ERROR`;
