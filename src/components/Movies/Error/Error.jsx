import React from 'react';
import './Error.css';

const Error = ({ message }) => {
  return (
    <div className="error">
      <p className="error__text">{message}</p>
    </div>
  );
};

export default Error;
