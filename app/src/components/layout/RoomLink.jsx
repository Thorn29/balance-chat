import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RoomLink.css';

const RoomLink = ({ id, title, desc, author }) => {

  const navigate = useNavigate();

  return(
    <div className='room-link'>
    <button className='room-link__enter' onClick={() => navigate(`/chatroom/${id}`)}>Enter</button>
      <div className='room-link__info'>
        <h1 className='room-link__title'>{title}</h1>
        <p className='room-link__desc'>{desc}</p>
      </div>
    <p className='room-link__author'>by <Link to={`/users/${author._id}`}>{author.username}</Link></p>
    </div>
  );
}

export default RoomLink;
