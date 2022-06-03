import React from 'react';
import './FormInput.css';

const FormInput = ({ children, change, errormsg, ...inputProps}) => {
  return(
    <div className='form-input'>
      {children}
      <input className='form-input__input' onChange={change} {...inputProps} autoComplete='off' />
      <p className='form-input__error'>{errormsg}</p>
    </div>
  );
}

export default FormInput;
