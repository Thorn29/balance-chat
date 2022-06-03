import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../components/layout/Loader';
import TopBar from '../components/layout/TopBar';
import ProfileLayout from '../components/layout/ProfileLayout';

const User = (props) => {

  const [ profile, setProfile ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const params = useParams();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));

    axios.get(`/users/${params.id}`, { headers: { Authorization: `Bearer ${token}`}}).then(res => {
      setProfile(res.data)
      setLoading(false);
    }).catch(err => {
      setProfile({ error: err.response });
      setLoading(false);
    });
  }, [params.id]);

  if (loading) return <Loader />
  return(
    <div className='user'>
      <TopBar />
      {profile.user ? <ProfileLayout user={{ id: profile.user._id, username: profile.user.username, days: profile.user.days}} rooms={profile.rooms} /> :
      <h1 className='empty'>User not found</h1>}
    </div>
  );
}

export default User;
