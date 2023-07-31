import React from 'react';
import './Header.css';
import { useLocation, useNavigate } from 'react-router-dom';
import greenCirle from '../../../images/green-circle.svg';
import Navigation from '../Navigation/Navigation';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const onNavigateMain = () => {
    if (location.pathname !== '/profile') {
      navigate('/');
    }
  };
  return (
    <header
      className={`header ${
        location.pathname === '/' ? 'header_type_main' : ''
      }`}
    >
      <img
        className="header__image header__image_margin"
        src={greenCirle}
        alt="лого"
        onClick={onNavigateMain}
      />
      <Navigation />
    </header>
  );
};

export default Header;
