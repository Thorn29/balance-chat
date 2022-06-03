import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/usercontext';
import Loader from '../components/layout/Loader';
import TopBar from '../components/layout/TopBar';
import ProfileLayout from '../components/layout/ProfileLayout';

const Main = (props) => {

  const [ rooms, setRooms ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.username) return navigate('/login')

    axios.get('/chatroom')
    .then(res => {
      setRooms(res.data);
      setLoading(false)
    })
    .catch(err => {
      setRooms({ error: true })
      setLoading(false);
    })
  }, [navigate, user.username]);

  if (loading) return <Loader />;
  return(
    <div className='main'>
      <TopBar />
      <ProfileLayout user={user} rooms={rooms} />
    </div>
  );
}

export default Main;
