import React, { useContext } from 'react';
import { format } from 'date-fns';
import UserContext from '../../context/usercontext';
import './MessageItem.css';

const MessageItem = ({ date, author, children }) => {

  const { user, setUser } = useContext(UserContext);

  return(
    <div className={`message-item ${user.username === author && 'self'}`}>
      <div className='message-item__body'>
        <span className='message-item__author'>
          {author}
        </span>
        <p className='message-item__text'>{children}</p>
      </div>
      <p className='message-item__timestamp'>
        {format(date, 'p')}
      </p>
    </div>
  );
}

export default MessageItem;
