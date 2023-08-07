import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../BaseComponents/Header/Header';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const onExit = () => {
    localStorage.clear();
    navigate('/');
  };
  return (
    <>
      <Header />
      <section className="profile">
        <h2 className="profile__header profile__header_margin">
          Привет, Данила!
        </h2>
        <form className="profile__form profile__form_margin">
          <div className="profile__input-container">
            <input type="text" className="profile__input" placeholder="Имя" />
            <p className="profile__input-result">Данила</p>
          </div>
          <div className="line line_color_grey profile__line_margin" />
          <div className="profile__input-container">
            <input
              type="text"
              className="profile__input"
              placeholder="E-mail"
            />
            <p className="profile__input-result">pochta@yandex.ru</p>
          </div>
        </form>
        <button
          type="button"
          className="profile__change profile__change_margin"
        >
          Редактировать
        </button>
        <button type="button" className="profile__exit profile__exit_margin" onClick={onExit}>
          Выйти из аккаунта
        </button>
      </section>
    </>
  );
};

export default Profile;
