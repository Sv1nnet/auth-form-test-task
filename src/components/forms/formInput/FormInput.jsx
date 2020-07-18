import React from 'react';
import PropTypes from 'prop-types';
import resolveClassName from '../../../utils/resolveClassName';

const FormInput = ({
  type,
  id,
  name,
  classNames,
  required,
  value,
  placeholder,
  defaultValue,
  onChange,
}) => {
  const labelClassName = resolveClassName('FormInput', classNames.labelClassName);
  const inputClassName = resolveClassName('FormInput__input', classNames.inputClassName);
  const textClassName = resolveClassName('FormInput__placeholder', classNames.textClassName);

  return (
    <label htmlFor={id} className={labelClassName}>
      {placeholder && <span className={textClassName}>{placeholder}</span>}
      <input onChange={onChange} type={type} name={name} id={id} className={inputClassName} value={value} required={required} />
    </label>
  );
}

FormInput.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
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
}

FormInput.defaultProps = {
  type: '',
  id: '',
  name: '',
  classNames: {},
  required: false,
  placeholder: '',
  defaultValue: null,
}

// If classNames the same and value is not changed then we don't need the input to be rerendered
export default React.memo(FormInput, (prev, curr) => {
  const valuesEqual = prev.value === curr.value;
  let classNamesEquals = false;
  
  for (const classNames in prev.classNames) {
    classNamesEquals = curr.classNames[classNames] === prev.classNames[classNames];
  }

  return valuesEqual && classNamesEquals;
});
