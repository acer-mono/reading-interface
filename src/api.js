const URL = 'https://vki.pythonanywhere.com';
const defaultHeaders = {
  'Content-Type': 'application/json',
  Authorization:
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYyMDM3NzE5OSwianRpIjoiZGNiNzA2MTQtZGVjZS00MzgxLWE4NmUtNTg3ZmQ2M2Q4YWYzIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEiLCJuYmYiOjE2MjAzNzcxOTksImV4cCI6MTYyMDk4MTk5OX0.uEOnjKZEakUqd_0xsxzeqpDVA7mFDvP_fvYeXIixGu4'
};
async function handleErrors(response) {
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(data.message);
  }
  return data;
}
const api = {
  users: {
    get: () =>
      fetch(`${URL}/users`, {
        method: 'GET',
        headers: defaultHeaders
      }).then(handleErrors)
  },
  user: {
    post: ({ login, password, isAdmin }) =>
      fetch(`${URL}/user`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({
          login,
          password,
          is_admin: isAdmin
        })
      }).then(handleErrors),

    put: ({ id, login, password, isAdmin }) =>
      fetch(`${URL}/user`, {
        method: 'PUT',
        headers: defaultHeaders,
        body: JSON.stringify({
          id,
          login,
          password,
          is_admin: isAdmin
        })
      }).then(handleErrors),

    delete: id =>
      fetch(`${URL}/user`, {
        method: 'DELETE',
        headers: defaultHeaders,
        body: JSON.stringify({
          id
        })
      }).then(handleErrors)
  },
  rooms: {
    get: () =>
      fetch(`${URL}/rooms`, {
        method: 'GET',
        headers: defaultHeaders
      }).then(handleErrors)
  },
  room: {
    post: name =>
      fetch(`${URL}/room`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({
          name
        })
      }).then(handleErrors),
    put: ({ id, name }) =>
      fetch(`${URL}/room`, {
        method: 'PUT',
        headers: defaultHeaders,
        body: JSON.stringify({
          id,
          name
        })
      }).then(handleErrors),
    delete: id =>
      fetch(`${URL}/room`, {
        method: 'DELETE',
        headers: defaultHeaders,
        body: JSON.stringify({
          id
        })
      }).then(handleErrors)
  },
  reading: {
    get: room =>
      fetch(`${URL}/reading?room=${room}`, {
        method: 'GET',
        headers: defaultHeaders
      }).then(handleErrors),
    post: ({ temperature, humidity, room }) =>
      fetch(`${URL}/reading`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({
          temperature,
          humidity,
          room
        })
      }).then(handleErrors),
    put: ({ temperature, humidity, room }) =>
      fetch(`${URL}/reading`, {
        method: 'PUT',
        headers: defaultHeaders,
        body: JSON.stringify({
          temperature,
          humidity,
          room
        })
      }).then(handleErrors)
  },
  readings: {
    get: (room, from, to) =>
      fetch(`${URL}/readings?from=${from}&to=${to}&room=${room}`, {
        method: 'GET',
        headers: defaultHeaders
      }).then(handleErrors)
  }
};

export default api;
