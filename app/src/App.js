import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Navigate } from 'react-router-dom';

import UserContext from './context/usercontext';
import Loader from './components/layout/Loader';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import ChatRoom from './pages/ChatRoom';
import NewRoom from './pages/NewRoom';
import EditRoom from './pages/EditRoom';
import User from './pages/User';
import GlobalError from './components/layout/GlobalError';
import socket from './socket';
import './App.css';

function App() {

  const [ user, setUser ] = useState({});
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(false);

  useEffect(() => {

    socket.on('connect_error', () => setError(true));

    socket.on('connect_failed', () => setError(true));

    const token = JSON.parse(localStorage.getItem('token'));
    const clearUser = () => {
      localStorage.clear();
      setUser({});
      setLoading(false);
    }

    if (token) {
      axios.get('/user', { headers: { Authorization: `Bearer ${token}` }})
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(err => clearUser())
    }

    else return setLoading(false);
  }, []);

  if (loading) return <Loader />;
  return (
    <UserContext.Provider value={{user, setUser}}>
    <div className="App">
      {error && <GlobalError click={() => setError(false)}>Connection lost: an error occured and we can't reach the server anymore. We apologize for this, and we will try to fix it as soon as possible</GlobalError>}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/main' element={<Main />} />
        <Route path='/chatroom/new' element={<NewRoom />} />
        <Route path='/chatroom/:id' element={<ChatRoom />} />
        <Route path='/edit/:id' element={<EditRoom />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='/' element={<Navigate to='/main' />} />
      </Routes>
    </div>
    </UserContext.Provider>
  );
}

export default App;
