import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AuthForm from '../forms/auth/AuthForm';

const AuthRoute = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/"><AuthForm /></Route>
        <Route exact path="*"><Redirect to="/" /></Route>
      </Switch>
    </div>
  );
}

export default AuthRoute;
