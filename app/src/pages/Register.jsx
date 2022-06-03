import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/usercontext';
import RegisterForm from '../components/forms/RegisterForm';

const Register = () => {

  const [ inputs, setInputs ] = useState({ username: '', email: '', password: '' });
  const [ errors, setErrors ] = useState({ username: '', email: '', password: '' });
  const { user, setUser } = useContext(UserContext);

  const emailCheck = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  const inputChangeHandler = (e) => {
    setInputs(prevInputs => {
      return {...prevInputs, [e.target.name]: e.target.value}
    })
  }

  const validateForm = (data) => {
    if (data.username.trim().length <= 0) {
      return setErrors(prevErrors => {
        return {...prevErrors, username: 'Username is required'}
      })
    }

    if (data.username.trim().length < 4) {
        return setErrors(prevErrors => {
          return {...prevErrors, username: 'Username is too short'}
        })
      }

    if (data.username.trim().length >= 25) {
        return setErrors(prevErrors => {
          return {...prevErrors, username: 'Username is too long'}
        })
      }

    if (data.email.trim().length <= 0) {
      return setErrors(prevErrors => {
        return {...prevErrors, email: 'Email is required'}
      })
    }

    if (!data.email.match(emailCheck)) {
      return setErrors(prevErrors => {
        return {...prevErrors, email: 'Email is invalid'}
      })
    }

    if (data.password.trim().length <= 0) {
        return setErrors(prevErrors => {
          return {...prevErrors, password: 'Password is required'}
        })
      }

    if (data.password.trim().length < 6) {
        return setErrors(prevErrors => {
          return {...prevErrors, password: 'Password is too short'}
        })
      }

    else return data;
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = validateForm(inputs);

    if (!formData) return;

    axios.post('/register', formData)
    .then(res => {
      const { token, ...rest } = res.data;
      localStorage.setItem('token', JSON.stringify(token))
      setUser({ ...rest });
    })
    .catch(err => {
      if (err.response.data.code === 11000) {
        const keys = Object.keys(err.response.data.keyValue);
        return keys.forEach(key => setErrors(prevErrors => {
          return {...prevErrors, [key]: `${err.response.data.keyValue[key]} is already taken`}
        }))
      }

      if (err.response.data.errors) {
        const keys = Object.keys(err.response.data.errors);
        return keys.forEach(key => setErrors(prevErrors => {
          return {...prevErrors, [key]: err.response.data.errors[key].message}
        }))
      }

      setErrors(prevErrors => {
        return {...prevErrors, password: err.response.data}
      });
    });
    setInputs({ username: '', email: '', password: '' });
  }

  if (user.username) return <Navigate to='/main' />;
  return(
    <div className='page centerxy'>
      <RegisterForm values={inputs} errors={errors} inpChange={inputChangeHandler} submit={submitHandler} />
    </div>
  );
}

export default Register;
