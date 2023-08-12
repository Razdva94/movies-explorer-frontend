import React from 'react';
import './LateralSlide.css';
import { useNavigate, useLocation } from 'react-router-dom';
import cross from '../../../../images/cross.svg';
import profile from '../../../../images/profile.svg';

const LateralSlide = ({ onSlideClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const onNavigateMain = () => {
    navigate('/');
  };
  const onNavigateMovies = () => {
    navigate('/movies');
  };
  const onNavigateSavedMovies = () => {
    navigate('/saved-movies');
  };
  const onNavigateProfile = () => {
    navigate('/profile');
  };
  return (
    <div className="lateral-slide-container">
      <div className="lateral-slide">
        <img
          src={cross}
          alt="закрыть"
          className="lateral-slide__cross"
          onClick={onSlideClose}
        />
        <p
          className={`lateral-slide__text lateral-slide__text_margin ${location.pathname === '/' && 'lateral-slide__text_active'}`}
          onClick={onNavigateMain}
        >
          Главная
        </p>
        <p
          className={`lateral-slide__text lateral-slide__text_margin ${
            location.pathname === '/movies' && 'lateral-slide__text_active'
          }`}
          onClick={onNavigateMovies}
        >
          Фильмы
        </p>
        <p
          className={`lateral-slide__text lateral-slide__text_margin ${
            location.pathname === '/saved-movies' &&
            'lateral-slide__text_active'
          }`}
          onClick={onNavigateSavedMovies}
        >
          Сохранённые фильмы
        </p>
        <img
          className="lateral-slide__profile-icon lateral-slide__profile-icon_margin"
          src={profile}
          alt="иконка профиля"
          onClick={onNavigateProfile}
        />
      </div>
    </div>
  );
};

export default LateralSlide;
