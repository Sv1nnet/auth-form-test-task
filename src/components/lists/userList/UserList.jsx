import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../../ui/loaders/Loader';
import user from '../../../actions/userActions';
import auth from '../../../actions/authActions';
import useRefreshToken from '../../../utils/hooks/useRefreshToken';
import useStatus from '../../../utils/hooks/useStatus';

import './style/style.scss';

const UserList = ({ users, getUserList: disptachedUserList }) => {
  const {
    status,
    setStatusLoading,
    handleSuccess,
    handleError,
  } = useStatus();
  const mounted = useRef(false); // We use this to prevent from updating status state if the component was unmounted
  const getUserList = useRefreshToken(disptachedUserList);

  useEffect(() => () => mounted.current = false, []);

  useEffect(() => {
    mounted.current = true;
    setStatusLoading();

    getUserList()
      .then((res) => {
        if (mounted.current) handleSuccess(res);
        return res;
      })
      .catch((err) => {
        if (mounted.current) handleError(err);
        return Promise.reject(err);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {status.loading && <Loader />}
      <div className="UserList">
        <ul className="UserList__container">
          {users.map((user) => <li key={user._id} className="UserList__item">{user.email}</li>)}
        </ul>
        {status.err.message && <p style={{ color: 'red', textAlign: 'center' }}>{status.err.message}</p>}
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  users: state.user.users,
});

const mapDispatchToProps = (dispatch) => ({
  getUserList: () => dispatch(user.getUserList()),
  refresh: () => dispatch(auth.refresh()),
});

UserList.proptTypes = {
  users: PropTypes.arrayOf({
    email: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  getUserList: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
