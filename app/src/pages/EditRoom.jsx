import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import TopBar from '../components/layout/TopBar';
import EditForm from '../components/forms/EditForm';


const NewRoom = () => {

  const [inputs, setInputs] = useState({ title: '', desc: '' });
  const [errors, setErrors] = useState({ title: '', desc: '' });
  const params = useParams()
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));

    axios.get(`/chatroom/${params.id}`, { headers: { Authorization: `Bearer ${token}` }}).then(res => {
      setInputs({ title: res.data.title, desc: res.data.desc })
    }).catch(err => console.log(err))
  }, [params.id])

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

    axios.patch(`/chatroom/${params.id}`, inputs, { headers: { Authorization: `Bearer ${token}` }}).then(res => navigate(`/chatroom/${params.id}`)).catch(err => {
      if (err.response.data.errors) {
        const errors = Object.keys(err.response.data.errors);
        errors.forEach(error => setErrors(prevErrors => {
          return {...prevErrors, [error]: err.response.data.errors[error].message}
        }))
      }

      setErrors(prevErrors => {
        return {...prevErrors, desc: err.response.data}
      })
    });


  }

  return(
    <>
      <TopBar style={{ position: 'absolute', top: '0', left: '0'}} />
      <div className='page centerxy'>
        <EditForm submit={submitHandler} inpChange={inputChangeHandler} errors={errors} values={inputs} />
      </div>
    </>
);
}

export default NewRoom;
