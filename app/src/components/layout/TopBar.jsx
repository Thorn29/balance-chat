import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import UserContext from '../../context/usercontext';
import { ReactComponent as LogoIcon } from '../../assets/icons/logo.svg';
import './TopBar.css';

const TopBar = ({ style }) => {

  const { user, setUser } = useContext(UserContext);

  const logOut = () => {
    localStorage.clear();
    setUser({});
  }

  if (!user.username) return <Navigate to='/login' />
  return(
    <div className='top-bar' style={style}>
      <Link to='/main'>
      <h1 className='top-bar__logo'><LogoIcon /><strong>Balance</strong>Chat</h1>
      </Link>
    <button className='top-bar__logout' onClick={logOut}>Log out</button>
    </div>
  );
}

export default TopBar;
