import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormContainer from '../../formContainer/FormContainer';
import FormBody from '../../formBody/FormBody';
import auth from '../../../../actions/authActions';
import useStatus from '../../../../utils/hooks/useStatus';

import Loader from '../../../ui/loaders/Loader';

const SignupForm = ({ signup }) => {
  const {
    status,
    setStatusLoading,
    handleSuccess,
    handleError,
  } = useStatus();

  const onSubmit = (e, formFields) => {
    e.preventDefault();
    setStatusLoading();

    const { email, password, confirmPassword } = formFields;

    if (password !== confirmPassword) return handleError({
      status: 400,
      message: 'Passwords don\'t match',
    });

    return signup(email, password)
      .then(handleSuccess)
      .catch((err) => {
        handleError(err);
        return Promise.reject(err);
      });
  };

  return (
    <>
      {status.loading && <Loader />}

      <FormContainer className="App__form" onSubmit={onSubmit} shouldReset>
        {({ formFields, formActions }) => {
          const { onChange } = formActions;
          return (
            <>
              <FormBody
                fields={[
                  {
                    type: 'email',
                    id: 'email',
                    onChange,
                    value: formFields.email,
                    placeholder: "Email",
                    required: true,
                  },
                  {
                    type: 'password',
                    id: 'password',
                    onChange,
                    value: formFields.password,
                    placeholder: "Password",
                    required: true,
                  },
                  {
                    type: 'password',
                    id: 'confirmPassword',
                    onChange,
                    value: formFields.confirmPassword,
                    placeholder: "Confirm password",
                    required: true,
                  },
                ]}
                buttonText="Sign Up"
              />
              {status.err.statusCode && <p style={{ textAlign: 'center', color: 'red' }}>{status.err.message}</p>}
            </>
          );
        }}
      </FormContainer>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signup: (email, password) => dispatch(auth.signup(email, password)),
})

SignupForm.propTypes = {
  signup: PropTypes.func.isRequired,
};


export default connect(null, mapDispatchToProps)(SignupForm);
