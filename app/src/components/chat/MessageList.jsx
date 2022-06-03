import React, { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';
import './MessageList.css';

const MessageList = ({ messages }) => {

  const containerRef = useRef(null);

  useEffect(() => {

    const containerElement = containerRef.current;
    const messageElements = containerElement.children[0].children;
    const lastElement = messageElements[messageElements.length - 1];
    const prevOffset = containerElement.scrollHeight - containerElement.clientHeight - lastElement.clientHeight - 40;

    if (containerElement.scrollHeight > containerElement.clientHeight && containerElement.scrollTop >= prevOffset) {
      containerElement.scrollTop = containerElement.scrollHeight
    }

  }, [messages])

  return(
    <div ref={containerRef} className='message-list'>
      <div className='message-list__stack'>
        {messages.length > 0 ? messages.map(msg => <MessageItem
        key={msg.createdAt} author={msg.author} date={msg.createdAt}>{msg.text}</MessageItem>) : <p className='message-list__empty'>New messages will show here</p>}
      </div>
    </div>
  );
}

export default MessageList;
