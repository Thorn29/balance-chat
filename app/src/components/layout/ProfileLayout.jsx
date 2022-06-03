import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import RoomLink from './RoomLink';
import Profile from './Profile';
import './ProfileLayout.css';

const ProfileLayout = ({ user, rooms }) => {

  const [ filter, setFilter ] = useState(false);

  const filteredRooms = rooms && rooms.filter(room => room.author.username === user.username);

  const roomSwitch = filter ? filteredRooms : rooms;

  return(
    <div className='profile-layout'>
      <div className='profile-layout__content'>
      <div className='profile-layout__list'>
        {user._id ?
          <div className={`profile-layout__switch ${filter && 'active'}`}>
          <button onClick={() => setFilter(false)} className='profile-layout__option'>All</button>
          <button onClick={() => setFilter(true)} className='profile-layout__option'>Mine</button>
        </div> :
        <h2 className='profile-layout__title'>Rooms created by {user.username}</h2>}
        <div className='profile-layout__rooms'>
        {rooms.length === 0 ? <p className='profile-layout__empty'>No rooms available</p> : roomSwitch.map(room => <RoomLink key={room._id} id={room._id} title={room.title} desc={room.desc} author={user._id ? room.author : user} />)}
        </div>
      </div>
      <Profile user={user} count={user._id ? filteredRooms.length : rooms.length} admin={user.email && true} />
      </div>
    </div>
  );
}

export default ProfileLayout;
