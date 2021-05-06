import React, { useEffect, useState } from 'react';
import './App.css';
import MainPage from './views/MainPage/MainPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EntityListView from './views/EntityListView/EntityListView';
import Header from './Header/Header';
import api from './api';

function App() {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(async () => {
    api.users.get().then(items => setUsers(items));
    api.rooms.get().then(items => setRooms(items));
  }, []);

  function deleteUserHandler(id) {
    let isConfirmed = confirm('Удалить пользователя?');
    if (isConfirmed) {
      api.user
        .delete(id)
        .then(deletedItem => setUsers(users.filter(item => item.id !== deletedItem.id)));
    }
  }

  function deleteRoomHandler(id) {
    let isConfirmed = confirm('Удалить помещение?');
    if (isConfirmed) {
      api.room
        .delete(id)
        .then(deletedItem => setUsers(users.filter(item => item.id !== deletedItem.id)));
    }
  }

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route
          exact
          path="/users"
          component={() => (
            <EntityListView
              items={users}
              fieldForSearching="login"
              title="Пользователи"
              deleteHandler={deleteUserHandler}
            />
          )}
        />
        <Route
          exact
          path="/rooms"
          component={() => (
            <EntityListView
              items={rooms}
              fieldForSearching="name"
              title="Помещения"
              deleteHandler={deleteRoomHandler}
            />
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
