import React from 'react';
import './GlobalError.css';

const GlobalError = ({ click, children }) => {
  return(
    <div className='global-error'>
      <p className='global-error__text'>{children}</p>
      <button className='global-error__button' onClick={click}>Got it</button>
    </div>
  );
}

export default GlobalError;
