import React from 'react';
import { Link } from 'react-router-dom';
import FormInput from './FormInput';
import { ReactComponent as NameIcon } from '../../assets/icons/person.svg';
import { ReactComponent as EmailIcon } from '../../assets/icons/mail.svg';
import { ReactComponent as PassIcon } from '../../assets/icons/pass.svg';
import './Form.css';

const RegisterForm = ({ inpChange, values, errors, submit }) => {

  return(
    <div className='form'>
      <h1 className='form__title'>Create an account</h1>
      <form onSubmit={submit}>
      <FormInput change={inpChange} errormsg={errors.username} type='text' name='username' placeholder='Username' value={values.username} required><NameIcon /></FormInput>
      <FormInput change={inpChange} errormsg={errors.email} type='email' name='email' placeholder='E-Mail' value={values.email} required><EmailIcon /></FormInput>
      <FormInput change={inpChange} errormsg={errors.password} type='password' name='password' placeholder='Password' value={values.password} required><PassIcon /></FormInput>
      <input type='submit' className='form__button' value='Enter' />
      </form>
      <Link to='/login' className='form__switch'>Already have an account? Log in instead</Link>
    </div>
  );
}

export default RegisterForm;
