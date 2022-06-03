import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import socket from '../../socket';
import ActiveList from './ActiveList';
import './ActiveDock.css';

const ActiveDock = ({ users, room, admin }) => {

  const navigate = useNavigate();
  const [ error, setError ] = useState(null);

  const delRequest = () => {
    socket.emit('del_room', room._id);
    const token = JSON.parse(localStorage.getItem('token'));
    axios.delete(`/chatroom/${room._id}`, { headers: { Authorization: `Bearer ${token}` }}).then(() => navigate('/main')).catch(err => setError(err.response.data));
  }


  return(
    <div className='active-dock'>
      <div className='active-dock__header'>
        <h1 className='active-dock__title'>{room.title}</h1>
        <button className='active-dock__exit' onClick={() => navigate('/main')}>Exit</button>
      </div>
      <p className='active-dock__desc'>{room.desc}</p>
      {admin && <div className='active-dock__admin'>
          <button className='active-dock__admin-button' onClick={() => navigate(`/edit/${room._id}`)}>Edit room</button>
          <button className='active-dock__admin-button' onClick={delRequest}>Delete room</button>
        </div>}
        {error && <p className='active-dock__error'>{error}</p>}
      <ActiveList users={users} />
    </div>
  );
}

export default ActiveDock;
