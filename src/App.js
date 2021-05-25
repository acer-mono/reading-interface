import React from 'react';
import './App.css';
import MainPage from './views/MainPage/MainPage';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header/Header';
import LoginForm from './LoginForm/LoginForm';
import { useAuth } from './auth';
import { RoomsView } from './views/RoomsView/RoomsView';
import { UsersView } from './views/UsersView/UsersView';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={() => <LoginForm />} />
        <PrivateRoute exact path="/" component={() => <HeaderWrapper component={MainPage} />} />
        <PrivateRoute
          exact
          path="/users"
          component={() => <HeaderWrapper component={UsersView} />}
        />
        <PrivateRoute
          exact
          path="/rooms"
          component={() => <HeaderWrapper component={RoomsView} />}
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
