import React from 'react';
import './Error.css';

const Error = () => {
  return (
    <div className="error">
      <p className="error__text">
        Во время запроса произошла ошибка. Возможно, проблема с соединением или
        сервер недоступен. Подождите немного и попробуйте ещё раз.
      </p>
    </div>
  );
};

export default Error;
