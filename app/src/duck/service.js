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
