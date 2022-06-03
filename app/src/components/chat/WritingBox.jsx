import React, { useState, useRef } from 'react';
import socket from '../../socket';
import { ReactComponent as SendIcon } from '../../assets/icons/send.svg';
import './WritingBox.css';

const WritingBox = () => {

  const [ text, setText ] = useState('');
  const [ error, setError ] = useState('');
  const inputElement = useRef(null);

  const textInputHandler = (e) => {
    setText(e.target.value);
  }

  const sendMessage = (e) => {
    e.preventDefault();

    if (text.trim().length > 0) {
      socket.emit('new_message', {text: text, createdAt: new Date().getTime()});
      setText('');
      inputElement.current.focus();
    }

    else return;
  }

  return(
    <div className='writing-box'>
      <p className='writing-box__error'>{error}</p>
      <form className='writing-box__form'>
        <input ref={inputElement} className='writing-box__input' onChange={textInputHandler} type='text' placeholder='Write your message here...' value={text} />
        <button className='writing-box__button' onClick={sendMessage}><SendIcon /></button>
      </form>
    </div>
  );
}

export default WritingBox;
