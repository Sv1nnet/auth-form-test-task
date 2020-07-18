import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import resolveClassName from '../../../utils/resolveClassName';

import './style/style.scss';

const FormBody = ({ className, buttonText, children }) => {
  const [bodyClassName, setBodyClassName] = useState(resolveClassName('FormBody', className));

  useEffect(() => {
    setBodyClassName(resolveClassName('FormBody', className));
  }, [className])

  return (
    <div className={bodyClassName}>
      {children}
      <button type="submit" className="FormBody__btn">{buttonText}</button>
    </div>
  );
};


FormBody.propTypes = {
  className: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

FormBody.defaultProps = {
  className: '',
}


export default FormBody;
