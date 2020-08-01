import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AuthRoute from './components/routes/AuthRoute';
import UserRoute from './components/routes/UserRoute';
import auth from './actions/authActions';

import './App.scss';

const App = ({ refreshToken, refresh }) => (
  <div className="App">
    {refreshToken ? <UserRoute /> : <AuthRoute />}
  </div>
);

const mapStateToProps = (state) => ({
  refreshToken: state.auth.refresh,
});

const mapDispatchToProps = (dispatch) => ({
  refresh: () => dispatch(auth.refresh()),
});

App.propTypes = {
  refreshToken: PropTypes.string,
  refresh: PropTypes.func.isRequired,
}

App.defaultProps = {
  refreshToken: null,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
