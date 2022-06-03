import React from 'react';
import './Loader.css';

const Loader = (props) => {
  return(
    <div className='loader'>
      <div className="loader__animation">
        <div className='loader__element'></div>
        <div className='loader__element'></div>
        <div className='loader__element'></div>
      </div>
    </div>
  );
}

export default Loader;
