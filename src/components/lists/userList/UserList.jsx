import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import user from '../../../actions/userActions';

import './style/style.scss';
import useStatus from '../../../utils/hooks/useStatus';
import Loader from '../../ui/loaders/Loader';

const UserList = ({ users, getUserList }) => {
  const {
    status,
    setStatusLoading,
    handleSuccess,
    handleError,
  } = useStatus();
  const mounted = useRef(false); // We use this to prevent from updating status state if the component was unmounted

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
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  users: state.user.users,
});

const mapDispatchToProps = (dispatch) => ({
  getUserList: () => dispatch(user.getUserList()),
});

UserList.proptTypes = {
  users: PropTypes.arrayOf({
    email: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  getUserList: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
