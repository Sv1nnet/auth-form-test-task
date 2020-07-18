import React, { useState } from 'react';
import PropTypes from 'prop-types';
import resolveClassName from '../../../utils/resolveClassName';

/**
 * Receives form content as a function (render-prop pattern) or React.element.
 * If children is a function then it provides in arguments object which contains
 * formFields and formActions (onChange and onSubmit).
 * If children is an React.element then the container clone it and provied that object
 * with fields and actions in props.
 */
const FormContainer = ({ className, onSubmit: submitAction, shouldReset, children }) => {
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const formClassName = resolveClassName('FormContainer', className);

  const resetFields = () => {
    setFormFields((prevState) => {
      const state = { ...prevState };
      for (const field in state) {
        state[field] = '';
      }

      return state;
    });
  }

  const onChange = (e) => {
    const { target } = e;
    setFormFields((prevState) => ({
      ...prevState,
      [target.id]: target.value,
    }));
  };

  const onSubmit = (e, callback) => {
    if (callback) callback(e, formFields);
    if (submitAction) {
      const res = submitAction(e, formFields);

      if (shouldReset) {
        if (res instanceof Promise) {
          res.then(resetFields)
        } else {
          resetFields();
        }
      }
    }
  };

  const propsToProvide = {
    formFields,
    formActions: { onChange, onSubmit },
  };

  return (
    <form action="" onSubmit={onSubmit} className={formClassName}>
      {
        typeof children === 'function'
          ? children(propsToProvide)
          : React.cloneElement(children, propsToProvide)
      }
    </form>
  );
}

FormContainer.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
  shouldReset: PropTypes.bool,  // Whether the form should reset its fields after submit is done successfully or should not
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
};

FormContainer.defaultProps = {
  className: '',
  onSubmit: null,
  shouldReset: false,
}

export default FormContainer;
