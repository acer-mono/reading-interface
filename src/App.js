import React, { useEffect } from 'react';
import './App.css';
import MainPage from './views/MainPage/MainPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EntityListView from './views/EntityListView/EntityListView';
import Header from './Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadAsync as roomLoadAsync,
  edit as userEdit,
  removeAsync as roomRemoveAsync
} from './redux/actions/rooms';
import {
  loadAsync as usersLoadAsync,
  edit as roomEdit,
  removeAsync as usersRemoveAsync
} from './redux/actions/users';

function App() {
  const dispatch = useDispatch();
  const rooms = useSelector(store => store.rooms.list);
  const users = useSelector(store => store.users.list);

  useEffect(async () => {
    dispatch(roomLoadAsync());
    dispatch(usersLoadAsync());
  }, []);

  return (
    <Router>
      <Header />
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
              deleteHandler={id => dispatch(usersRemoveAsync(id))}
              updateHandler={user => userEdit(user)}
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
              deleteHandler={id => dispatch(roomRemoveAsync(id))}
              updateHandler={room => roomEdit(room)}
            />
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
