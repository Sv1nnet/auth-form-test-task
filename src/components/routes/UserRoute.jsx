import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import UserList from '../lists/userList/UserList';
import auth from '../../actions/authActions';

const AuthRoute = ({ signout }) => {
  return (
    <div>
      <button className="App__signout-btn" onClick={signout}>Sign Out</button>
      <Switch>
        <Route exact path="/"><UserList /></Route>
        <Route exact path="*"><Redirect to="/" /></Route>
      </Switch>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  signout: () => dispatch(auth.signout()),
});

AuthRoute.propTypes = {
  signout: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(AuthRoute);
