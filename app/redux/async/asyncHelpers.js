import {store} from "../store";
import {accountLogout} from "../account/accountActions";

export const apiFetch = (url, options) => {
  let r = fetch(url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_API_HOST}/api/${url.replace(/^\//, '')}`, {
    ...options,
    headers: {
      "x-access-token": localStorage.getItem('token'),
      'content-type': 'application/json',
      ...(options.headers || {})
    }
  }).then(r => {
    if (r.status < 299)
      return r.json();
     r.text().then(err => {
       switch(err) {
         case 'invalid_token':
           store.dispatch(accountLogout());
           return {};
         default:
           throw new Error(err);
       }
     })
  })
  return r;
}

export const asyncActionSuccess = (action) => `${action}/SUCCESS`;