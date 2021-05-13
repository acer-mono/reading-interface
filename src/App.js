import React, { useEffect, useState } from 'react';
import './App.css';
import MainPage from './views/MainPage/MainPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EntityListView from './views/EntityListView/EntityListView';
import Header from './Header/Header';
import api from './api';
import { useDispatch, useSelector } from 'react-redux';
import { loadAsync, removeAsync } from './redux/actions/rooms';

function App() {
  const [users, setUsers] = useState([]);
  const [, setRooms] = useState([]);
  const dispatch = useDispatch();
  const rooms = useSelector(store => store.rooms.list);

  useEffect(async () => {
    dispatch(loadAsync());
  }, []);

  function deleteUserHandler(id) {
    let isConfirmed = confirm('Удалить пользователя?');
    if (isConfirmed) {
      api.user
        .delete(id)
        .then(deletedItem => setUsers(users.filter(item => item.id !== deletedItem.id)));
    }
  }

  function updateUserHandler(user) {
    setUsers(
      users.map(u => {
        if (u.id === user.id) {
          u.login = user.login;
          u.password = user.password;
          u.isAdmin = user.isAdmin;
        }
        return u;
      })
    );
  }

  function updateRoomHandler(room) {
    setRooms(
      rooms.map(r => {
        if (r.id === room.id) {
          r.name = room.name;
        }
        return r;
      })
    );
  }

  function addUserHandler(user) {
    users.push(user);
    setUsers([...users]);
  }

  function addRoomHandler(room) {
    rooms.push(room);
    setUsers([...rooms]);
  }

  return (
    <Router>
      <Header addUserHandler={addUserHandler} addRoomHandler={addRoomHandler} />
      <Switch>
        <Route exact path="/" component={() => <MainPage rooms={rooms} />} />
        <Route
          exact
          path="/users"
          component={() => (
            <EntityListView
              items={users}
              fieldForSearching="login"
              title="Пользователи"
              deleteHandler={deleteUserHandler}
              updateHandler={updateUserHandler}
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
              deleteHandler={id => dispatch(removeAsync(id))}
              updateHandler={updateRoomHandler}
            />
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
