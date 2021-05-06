const URL = 'http://vki.pythonanywhere.com';
const defaultHeaders = {
  'Content-Type': 'application/json',
  Authorization:
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYxOTg3ODU3MCwianRpIjoiMzdjMjc1NTMtZDg1Ny00YWRkLTg5ZjMtMzU4MDM1YTAxNjQxIiwibmJmIjoxNjE5ODc4NTcwLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMSIsImV4cCI6MTYyMDQ4MzM3MH0.mXvKU9hJVbZFAMz8hw4wPhbZb5vyX_7fxTH0W3jtfeE'
};
async function handleErrors(response) {
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(data.error);
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
    delete: id =>
      fetch(`${URL}/room`, {
        method: 'DELETE',
        headers: defaultHeaders,
        body: JSON.stringify({
          id
        })
      }).then(handleErrors)
  }
};

export default api;
