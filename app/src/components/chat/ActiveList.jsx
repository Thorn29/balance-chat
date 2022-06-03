import React, { useState } from 'react';
import ActiveUser from './ActiveUser';
import './ActiveList.css';

const ActiveList = ({ users }) => {

  const [ isVisible, setVisibility ] = useState(false);

  const toggleList = () => {
    setVisibility(isVisible => !isVisible)
  };

  return(
    <>
    <h4 className='active-dock__group' onClick={toggleList}>Online ({users.length})</h4>
    <div className={isVisible ? 'active-list__userbox active' : 'active-list__userbox'}>
      <ul className='active-list__list'>
      {users.map(user => <ActiveUser key={user.id} data={user} />)}
      </ul>
    </div>
    </>
  );
}

export default ActiveList;
