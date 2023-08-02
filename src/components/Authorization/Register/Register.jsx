import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import greenCirle from '../../../images/green-circle.svg';
import './Register.css';

const Register = ({ inputs, margin, sayHi, button }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const onNavigateMain = () => {
    navigate('/');
  };

  const onNavigateFilmsOrLogin = () => {
    if (location.pathname === '/signup') {
      navigate('/signin');
    } else if (location.pathname === '/signin') {
      navigate('/movies');
    }
  };
  const onNavigateLoginOrRegister = () => {
    if (location.pathname === '/signup') {
      navigate('/signin');
    } else if (location.pathname === '/signin') {
      navigate('/signup');
    }
  };
  return (
    <section className="register">
      <div className="register__container">
        <img
          className="register__logo register__logo_margin"
          src={greenCirle}
          alt="лого"
          onClick={onNavigateMain}
        />
        <h2 className="register__title register__title_margin">{sayHi}</h2>
        {inputs.map((input, i) => {
          return (
            <React.Fragment key={i}>
              <p className="register__input-title register__input-title_margin">
                {input.title}
              </p>
              <input type={input.type} className="register__input" />
              <div className="line line_color_grey register__line_margin" />
            </React.Fragment>
          );
        })}
        <button
          type="button"
          onClick={onNavigateFilmsOrLogin}
          className={`register__button ${margin}`}
        >
          {button[0]}
        </button>
        <p className="register__text register__text_margin">
          {button[1]}
          {'\u00A0'}
          <span
            className="register text register__text_color_blue"
            onClick={onNavigateLoginOrRegister}
          >
            {button[2]}
          </span>
        </p>
      </div>
    </section>
  );
};

export default Register;
