import React from 'react';
import { Link } from 'react-router-dom';
import FormInput from './FormInput';
import { ReactComponent as NameIcon } from '../../assets/icons/person.svg';
import { ReactComponent as PassIcon } from '../../assets/icons/pass.svg';
import './Form.css';

const LoginForm = ({ inpChange, values, errors, submit }) => {
  return(
    <div className='form'>
      <h1 className='form__title'>Log In</h1>
      <form onSubmit={submit}>
      <FormInput change={inpChange} errormsg={errors.username} type='text' name='username' placeholder='Username' value={values.username} required><NameIcon /></FormInput>
      <FormInput change={inpChange} errormsg={errors.password} type='password' name='password' placeholder='Password' value={values.password} required><PassIcon /></FormInput>
      <input type='submit' className='form__button' value='Enter' />
      </form>
      <Link to='/register' className='form__switch'>Don't have an account? Create one now</Link>
    </div>
  );
}

export default LoginForm;
