import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ActiveUser.css';

const ActiveUser = ({ data }) => {

  const navigate = useNavigate();

  return(
    <li className='active-user'><p className='active-user__username' onClick={() => navigate(`/users/${data.originalId}`)}>{data.name}</p></li>
  );
}

export default ActiveUser;
