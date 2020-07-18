import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.scss';
import AuthRoute from './components/routes/AuthRoute';
import UserRoute from './components/routes/UserRoute';
import Loader from './components/ui/loaders/Loader';
import auth from './actions/authActions';
import useStatus from './utils/hooks/useStatus';

const App = ({ token, refresh }) => {
  const [tokenVerified, setTokenVerified] = useState(false);
  const {
    status,
    setStatusLoading,
    handleSuccess,
    handleError,
  } = useStatus();

  // Refresh token if token exists and App was just mounted (e.g. a page was refreshed)
  useEffect(() => {
    if (token) {
      setStatusLoading();
      refresh()
        .then(handleSuccess)
        .then((res) => { setTokenVerified(true); return res; })
        .catch(handleError)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token) setTokenVerified(true);
    else setTokenVerified(false);
  }, [token])

  return (
    <div className="App">
      {status.loading && <Loader />}
      {!token && <AuthRoute />}
      {tokenVerified && <UserRoute />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.auth.refresh,
});

const mapDispatchToProps = (dispatch) => ({
  refresh: () => dispatch(auth.refresh()),
});

App.propTypes = {
  token: PropTypes.string,
  refresh: PropTypes.func.isRequired,
}

App.defaultProps = {
  token: null,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
