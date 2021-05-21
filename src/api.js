import { authFetch } from './auth';

const URL = 'http://localhost:5000';

const defaultHeaders = {
  'Content-Type': 'application/json'
};

async function handleErrors(response) {
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(data.message);
  }
  return data;
}

async function handleBinaryFilesErrors(response) {
  const data = await response;
  if (response.status !== 200) {
    throw new Error(data.message);
  }
  return data;
}

const api = {
  users: {
    get: () =>
      authFetch(`${URL}/users`, {
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
      authFetch(`${URL}/rooms`, {
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
  },
  plot: {
    get: ({ from, to, room, type }) =>
      fetch(
        `${URL}/plot?from=${from.toISOString().split('T')[0]}&to=${
          to.toISOString().split('T')[0]
        }&room=${room}&type=${type}`,
        {
          method: 'GET'
        }
      ).then(handleBinaryFilesErrors)
  },
  table: {
    get: ({ format, from, to, room }) =>
      fetch(
        `${URL}/table?from=${from.toLocaleDateString()}&to=${to.toLocaleDateString()}&room=${room}&format=${format}`,
        {
          method: 'GET'
        }
      ).then(handleBinaryFilesErrors)
  },
  auth: {
    post: ({ login, password }) =>
      fetch(`${URL}/login`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({
          login,
          password
        })
      }).then(handleErrors)
  }
};

export default api;
