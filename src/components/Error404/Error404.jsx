import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Error404.css';

const Error404 = () => {
  const navigate = useNavigate();
  const onNavigateMain = () => {
    navigate('/');
  };
  return (
    <section className="error404">
      <h2 className="error404__title">404</h2>
      <p className="error404__text">Страница не найдена</p>
      <p className="error404__link" onClick={onNavigateMain}>Назад</p>
    </section>
  );
};

export default Error404;
