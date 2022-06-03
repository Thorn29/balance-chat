import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/usercontext';
import LoginForm from '../components/forms/LoginForm';

const Login = () => {

  const [ inputs, setInputs ] = useState({ username: '', password: '' });
  const [ errors, setErrors ] = useState({ username: '', password: '' });
  const { user, setUser } = useContext(UserContext);

  const inputChangeHandler = (e) => {
    setErrors({ username: '', password: '' });
    setInputs(prevInputs => {
      return {...prevInputs, [e.target.name]: e.target.value}
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (inputs.username.trim().length <= 0) {
      return setErrors(prevErrors => {
        return {...prevErrors, username: 'Username is required'}
      })
    }

    if (inputs.password.trim().length <= 0) {
        return setErrors(prevErrors => {
          return {...prevErrors, password: 'Password is required'}
        })
      }

    axios.post('/login', inputs)
    .then(res => {
      const { token, ...rest } = res.data;
      localStorage.setItem('token', JSON.stringify(token))
      setUser({ ...rest })
    }).catch(err => {
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
    })
    setInputs({ username: '', password: '' });
  }

  if (user.username) return <Navigate to='/main' />;
  return(
    <div className='page centerxy'>
      <LoginForm values={inputs} errors={errors} inpChange={inputChangeHandler} submit={submitHandler} />
    </div>
  );

}



export default Login;
