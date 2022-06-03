import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = ({ user, count, admin }) => {

  const navigate = useNavigate();


  return(
    <div className={admin ? 'profile admin' : 'profile'}>
      <div className='profile__info'>
        <h2 className='profile__name'>{user.username}</h2>
        {admin && <p className='profile__email'>{user.email}</p>}
      </div>
      <div className='profile__count'>
        <p className='profile__number'>{user.days}</p>
        <p className='profile__stat'>days</p>
      </div>
      <div className='profile__count'>
        <p className='profile__number'>{count}</p>
        <p className='profile__stat'>rooms</p>
      </div>
      {admin ? <button className='profile__button' onClick={() => navigate('/chatroom/new')}>+</button> :
      <button className='profile__button' onClick={() => navigate(-1)}>&#8678;</button>}
    </div>
  );
}

export default Profile;
