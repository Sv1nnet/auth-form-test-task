import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormContainer from '../../formContainer/FormContainer';
import FormBody from '../../formBody/FormBody';
import auth from '../../../../actions/authActions';
import useStatus from '../../../../utils/hooks/useStatus';
import Loader from '../../../ui/loaders/Loader';
import FormInput from '../../formInput/FormInput';

const SignupForm = ({ signin }) => {
  const {
    status,
    setStatusLoading,
    handleError,
  } = useStatus();

  const onSubmit = (e, formFields) => {
    e.preventDefault();
    setStatusLoading();

    const { email, password } = formFields;
    return signin(email, password)
      .catch(handleError);
  };

  return (
    <>
      {status.loading && <Loader />}

      <FormContainer className="App__form" onSubmit={onSubmit}>
        {({ formFields, formActions }) => {
          const { onChange } = formActions;
          const classNames = {
            labelClassName: 'FormBody__label',
            inputClassName: 'FormBody__input',
            textClassName: 'FormBody__text',
          };
          return (
            <>
              <FormBody buttonText="Sign In">
                <FormInput
                  type="email"
                  id="email"
                  onChange={onChange}
                  value={formFields.email}
                  placeholder="Email"
                  required
                  classNames={classNames}
                />
                <FormInput
                  type="password"
                  id="password"
                  onChange={onChange}
                  value={formFields.password}
                  placeholder="Password"
                  required
                  classNames={classNames}
                />
              </FormBody>
              {status.err.statusCode && <p style={{ textAlign: 'center', color: 'red' }}>{status.err.message}</p>}
            </>
          );
        }}
      </FormContainer>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signin: (email, password) => dispatch(auth.signin(email, password)),
})

SignupForm.propTypes = {
  signin: PropTypes.func.isRequired,
};


export default connect(null, mapDispatchToProps)(SignupForm);
