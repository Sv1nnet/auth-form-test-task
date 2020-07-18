import React, { useState } from 'react';
import SignupForm from './signup/SignupForm';
import SigninForm from './signin/SigninForm';

import './style/style.scss';

const forms = {
  signup: SignupForm,
  signin: SigninForm,
};

const AuthForm = () => {
  const [form, setForm] = useState('signup');
  const FormToRender = forms[form];

  /**
   * 
   * @param {string} type - form whith we want to render
   * @returns {Function} on click handler
   */
  const getOnClickHandler = (type) => (e) => {
    e.preventDefault();
    setForm(type);
  };

  return (
    <div className="AuthForm">
      <div className="AuthForm__btns-container">
        <a href="/" className="AuthForm__btn" onClick={getOnClickHandler('signup')}>Sign Up</a>
        <a href="/" className="AuthForm__btn" onClick={getOnClickHandler('signin')}>Sign In</a>
      </div>
      <FormToRender />
    </div>
  );
}

export default AuthForm;
