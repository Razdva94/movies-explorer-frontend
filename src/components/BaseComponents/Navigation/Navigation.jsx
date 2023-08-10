import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LateralSlide from './LateralSlide/LateralSlide';
import profile from '../../../images/profile.svg';
import stripes from '../../../images/stripes.svg';
import './Navigation.css';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const onNavigateRegister = () => {
    navigate('/signup');
  };
  const onNavigateLogin = () => {
    navigate('/signin');
  };
  const onNavigateFilms = () => {
    navigate('/movies');
  };
  const onNavigateSavedFilms = () => {
    navigate('/saved-movies');
  };
  const onNavigateProfile = () => {
    navigate('/profile');
  };

  const [slideOpen, setSlideOpen] = useState(false);
  const onSlideOpen = () => {
    setSlideOpen(true);
  };

  const onSlideClose = () => {
    setSlideOpen(false);
  };

  let navigationContent;
  if (
    location.pathname === '/' &&
    localStorage.getItem('validated') !== 'true'
  ) {
    navigationContent = (
      <>
        <p
          className="navigation__link navigation__link_margin"
          onClick={onNavigateRegister}
        >
          Регистрация
        </p>
        <button
          className="navigation__button navigation__button_margin"
          type="button"
          onClick={onNavigateLogin}
        >
          Войти
        </button>
      </>
    );
  } else {
    navigationContent = (
      <>
        <p
          className={`navigation__link-movies ${
            location.pathname === '/movies' && 'navigation__link-movies_active'
          }`}
          onClick={onNavigateFilms}
        >
          Фильмы
        </p>
        <p
          className={`navigation__link-movies ${
            location.pathname === '/saved-movies' &&
            'navigation__link-movies_active'
          }`}
          onClick={onNavigateSavedFilms}
        >
          Сохранённые фильмы
        </p>
        <img
          className="navigation__profile-icon"
          src={profile}
          alt="иконка профиля"
          onClick={onNavigateProfile}
        />
        {!slideOpen ? (
          <img
            className="navigation__stripes"
            src={stripes}
            alt="линии"
            onClick={onSlideOpen}
          />
        ) : (
          <LateralSlide onSlideClose={onSlideClose} />
        )}
      </>
    );
  }
  return navigationContent;
};

export default Navigation;
