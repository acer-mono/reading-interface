import React, { useEffect } from 'react';
import './App.css';
import MainPage from './views/MainPage/MainPage';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header/Header';
import LoginForm from './LoginForm/LoginForm';
import { useAuth } from './auth';
import { RoomsView } from './views/RoomsView/RoomsView';
import { UsersView } from './views/UsersView/UsersView';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAsync } from './redux/actions/currentUser';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAsync());
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/reading-interface/login" component={() => <LoginForm />} />
        <PrivateRoute
          exact
          path="/reading-interface"
          component={() => <HeaderWrapper component={MainPage} />}
        />
        <PrivateAdminRoute
          exact
          path="/reading-interface/users"
          component={() => <HeaderWrapper component={UsersView} />}
        />
        <PrivateAdminRoute
          exact
          path="/reading-interface/rooms"
          component={() => <HeaderWrapper component={RoomsView} />}
        />
      </Switch>
    </Router>
  );
}

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const [logged] = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAsync());
  }, []);

  return (
    <Route
      {...rest}
      render={props =>
        logged ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/reading-interface/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export const PrivateAdminRoute = ({ component: Component, ...rest }) => {
  const [logged] = useAuth();
  const user = useSelector(store => store.currentUser.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAsync());
  }, []);

  return (
    <Route
      {...rest}
      render={props =>
        logged && user.isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/reading-interface/login', state: { from: props.location } }}
          />
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
