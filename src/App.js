import React, { useEffect } from 'react';
import './App.css';
import MainPage from './views/MainPage/MainPage';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
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
import LoginForm from './LoginForm/LoginForm';
import { useAuth } from './auth';

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
      <Switch>
        <Route exact path="/login" component={() => <LoginForm />} />
        <PrivateRoute
          exact
          path="/"
          component={() => <HeaderWrapper component={MainPage} rooms={rooms} />}
        />
        <PrivateRoute
          exact
          path="/users"
          component={() => (
            <HeaderWrapper
              component={EntityListView}
              items={users}
              fieldForSearching="login"
              title="Пользователи"
              deleteHandler={id => dispatch(usersRemoveAsync(id))}
              updateHandler={user => userEdit(user)}
            />
          )}
        />
        <PrivateRoute
          exact
          path="/rooms"
          component={() => (
            <HeaderWrapper
              component={EntityListView}
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

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const [logged] = useAuth();
  return (
    <Route
      {...rest}
      render={props =>
        logged ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
};

export const HeaderWrapper = ({ component: Component, ...props }) => {
  return (
    <>
      <Header />
      <Component {...props} />
    </>
  );
};

export default App;
