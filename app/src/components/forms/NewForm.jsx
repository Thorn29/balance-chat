import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from './FormInput';
import './Form.css';

const NewForm = ({ submit, inpChange, errors, values }) => {

  const navigate = useNavigate();

  return(
    <div className='form'>
      <h1 className='form__title'>New Room</h1>
      <form onSubmit={submit}>
      <FormInput change={inpChange} errormsg={errors.title} type='text' name='title' placeholder='Title' value={values.title} required></FormInput>
      <FormInput change={inpChange} errormsg={errors.desc} type='text' name='desc' placeholder='Description' value={values.desc} required></FormInput>
      <input type='submit' className='form__button' value='Enter' />
      </form>
      <p className='form__switch' onClick={() => navigate(-1)}>Go back</p>
    </div>
  );
}

export default NewForm;
