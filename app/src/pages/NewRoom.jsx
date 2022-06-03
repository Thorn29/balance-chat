import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/layout/TopBar';
import NewForm from '../components/forms/NewForm';


const NewRoom = () => {

  const [inputs, setInputs] = useState({ title: '', desc: '' });
  const [errors, setErrors] = useState({ title: '', desc: '' });
  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    setInputs(prevInputs => {
      return {...prevInputs, [e.target.name]: e.target.value}});
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (inputs.title.trim().length <= 0) {
        return setErrors(prevErrors => {
          return {...prevErrors, title: 'Title is required'}
        })
      }

    if (inputs.title.trim().length < 4) {
        return setErrors(prevErrors => {
          return {...prevErrors, title: 'Title is too short'}
        })
      }

    if (inputs.title.trim().length >= 15) {
        return setErrors(prevErrors => {
          return {...prevErrors, title: 'Title is too long'}
        })
      }

    if (inputs.desc.trim().length <= 0) {
        return setErrors(prevErrors => {
          return {...prevErrors, desc: 'Description is required'}
        })
      }

    if (inputs.desc.trim().length < 5) {
        return setErrors(prevErrors => {
          return {...prevErrors, desc: 'Description is too short'}
        })
      }

    if (inputs.desc.trim().length >= 100) {
        return setErrors(prevErrors => {
          return {...prevErrors, desc: 'Description is too long'}
        })
      }

    const token = JSON.parse(localStorage.getItem('token'));

    axios.post('/chatroom', inputs, { headers: { Authorization: `Bearer ${token}` }}).then(res => navigate(`/chatroom/${res.data._id}`)).catch(err => {
      const errors = Object.keys(err.response.data.errors);
      errors.forEach(error => setErrors(prevErrors => {
        return {...prevErrors, [error]: err.response.data.errors[error].message}
      }))
    });
  }

  return(
    <>
      <TopBar style={{ position: 'absolute', top: '0', left: '0'}} />
      <div className='page centerxy'>
        <NewForm submit={submitHandler} inpChange={inputChangeHandler} errors={errors} values={inputs} />
      </div>
    </>
);
}

export default NewRoom;
