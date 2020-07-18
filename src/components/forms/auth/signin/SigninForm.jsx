import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormContainer from '../../formContainer/FormContainer';
import FormBody from '../../formBody/FormBody';
import auth from '../../../../actions/authActions';
import useStatus from '../../../../utils/hooks/useStatus';
import Loader from '../../../ui/loaders/Loader';

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
                  }
                ]}

                buttonText="Sign In"
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
  signin: (email, password) => dispatch(auth.signin(email, password)),
})

SignupForm.propTypes = {
  signin: PropTypes.func.isRequired,
};


export default connect(null, mapDispatchToProps)(SignupForm);
