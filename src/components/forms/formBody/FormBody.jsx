import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FormInput from '../formInput/FormInput';
import resolveClassName from '../../../utils/resolveClassName';

import './style/style.scss';

const FormBody = ({ className, buttonText, fields }) => {
  const [bodyClassName, setBodyClassName] = useState(resolveClassName('FormBody', className));

  useEffect(() => {
    setBodyClassName(resolveClassName('FormBody', className));
  }, [className])

  return (
    <div className={bodyClassName}>
      {fields.map((field) => (
        <FormInput
          key={field.id}
          {...field}
          classNames={{
            labelClassName: 'FormBody__label',
            inputClassName: 'FormBody__input',
            textClassName: 'FormBody__text',
          }}
        />
      ))}
      <button type="submit" className="FormBody__btn">{buttonText}</button>
    </div>
  );
};


FormBody.propTypes = {
  className: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({ // inputs that we need in a form body
    type: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    classNames: PropTypes.shape({
      labelClassName: PropTypes.string,
      inputClassName: PropTypes.string,
      textClassName: PropTypes.string,
    }),
    required: PropTypes.bool,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
  })),
};

FormBody.defaultProps = {
  className: '',
  fields: [],
}


export default FormBody;
