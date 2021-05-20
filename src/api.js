const URL = 'http://127.0.0.1:5000';

const defaultHeaders = {
  'Content-Type': 'application/json',
  Authorization:
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYyMTA2OTM3MiwianRpIjoiMjFhMTI1MGEtZDFlOC00OTc2LWIwMjQtYWNmZTMwNzM5YjNkIiwibmJmIjoxNjIxMDY5MzcyLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiNCIsImV4cCI6MTYyMTY3NDE3Mn0.h1v4dYEWlRxi61c8ijBzjrgvbbK0JrNQ8eZFN0dcvK8'
};
const plotHeaders = {
  Authorization:
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYyMTA2OTM3MiwianRpIjoiMjFhMTI1MGEtZDFlOC00OTc2LWIwMjQtYWNmZTMwNzM5YjNkIiwibmJmIjoxNjIxMDY5MzcyLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiNCIsImV4cCI6MTYyMTY3NDE3Mn0.h1v4dYEWlRxi61c8ijBzjrgvbbK0JrNQ8eZFN0dcvK8'
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
  },
  plot: {
    get: ({ from, to, room, type }) =>
      fetch(
        `${URL}/plot?from=${from.toISOString().split('T')[0]}&to=${
          to.toISOString().split('T')[0]
        }&room=${room}&type=${type}`,
        {
          method: 'GET',
          headers: plotHeaders
        }
      ).then(handleBinaryFilesErrors)
  },
  table: {
    get: ({ format, from, to, room }) =>
      fetch(
        `${URL}/table?from=${from.toLocaleDateString()}&to=${to.toLocaleDateString()}&room=${room}&format=${format}`,
        {
          method: 'GET',
          headers: plotHeaders
        }
      ).then(handleBinaryFilesErrors)
  },
  auth: {
    post: ({ login, password }) =>
      fetch(`${URL}/auth`, {
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
