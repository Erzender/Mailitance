export const fetchLogin = (username, password) => {
  return fetch(process.env.SERVER + "/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json().then(json => json))
    .catch(err => ({ error: true, err }));
};

export const fetchGroups = token => {
  return fetch(process.env.SERVER + "/api/group", {
    method: "GET",
    headers: {
      "x-access-token": token
    }
  })
    .then(res => res.json().then(json => json))
    .catch(err => ({ error: true, err }));
};

export const fetchUser = (token, userId) => {
  return fetch(process.env.SERVER + "/api/account/" + userId, {
    method: "GET",
    headers: {
      "x-access-token": token
    }
  })
    .then(res => res.json().then(json => json))
    .catch(err => ({ error: true, err }));
};

export const postContacts = (token, group, contacts) => {
  return fetch(process.env.SERVER + "/api/contacts", {
    method: "POST",
    headers: { "x-access-token": token, "Content-Type": "application/JSON" },
    body: JSON.stringify({ contacts, group })
  })
    .then(res => res.json().then(json => json))
    .catch(err => ({ error: true, err }));
};
