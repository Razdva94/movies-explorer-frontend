import React, { useState } from 'react';
import validator from 'validator';
import { useNavigate, useLocation } from 'react-router-dom';
import greenCirle from '../../../images/green-circle.svg';
import useForm from '../../../hooks/useForm';
import mainApi from '../../../utils/MainApi';
import './Register.css';

const Register = ({
  inputs,
  margin,
  sayHi,
  button,
  onLoggedIn,
  updateContextValue,
}) => {
  const location = useLocation();
  const [serverErrors, setServerErrors] = useState(null);
  const [errors, setErrors] = useState({});
  const [savedErrorValue, setSavedErrorValue] = useState(null);
  const { values, handleChange } = useForm({
    name: '',
    email: '',
    password: '',
  });
  const onInputChange = (e) => {
    const { value, name } = e.target;
    if (location.pathname === '/signin') {
      if (serverErrors) {
        setServerErrors(null);
      }
    }
    if (location.pathname === '/signup') {
      if (serverErrors && name === 'email') {
        setServerErrors(null);
      }
      if (savedErrorValue === e.target.value) {
        setServerErrors('Пользователь с таким email уже существует.');
      }
    }
    const newErrors = { ...errors };
    handleChange(e);
    if (!value || value.trim() === ' ') {
      newErrors[name] = 'Это обязательное поле';
    } else if (name === 'email' && !validator.isEmail(value) && value) {
      newErrors[name] = 'Некорректный адрес электронной почты';
    } else if (
      name === 'name' &&
      !/^[-a-zA-Zа-яА-Я\s]+$/.test(value) &&
      value
    ) {
      newErrors[name] =
        'Имя может содержать только латиницу, кириллицу, пробел или дефис';
    } else if (
      name === 'name' &&
      /^[-a-zA-Zа-яА-Я\s]+$/.test(value) &&
      (value.length < 2 || value.length > 30)
    ) {
      newErrors[name] = 'Длина имени от 2 до 30 символов';
    } else {
      delete newErrors[e.target.name];
    }
    setErrors(newErrors);
  };
  const emptyInputReg = Object.values(values).some((value) => value === '');
  const emptyInputLog = Object.values(values)
    .splice(1, Object.values(values).length)
    .some((value) => value === '');
  const noErrors = Object.values(errors).length === 0;
  const navigate = useNavigate();
  const onNavigateMain = () => {
    navigate('/');
  };
  const onNavigateFilmsOrLogin = (e) => {
    e.preventDefault();
    if (location.pathname === '/signup') {
      mainApi
        .postToSignup(values)
        .then(() =>
          mainApi
            .postToSignin(values)
            .then(() =>
              mainApi
                .getUser()
                .then((res) => updateContextValue(res))
                .then(() => {
                  onLoggedIn();
                  localStorage.setItem('validated', true);
                  navigate('/movies');
                })
                .catch((err) => {
                  console.log(err);
                  setServerErrors(
                    'При регистрации пользователя произошла ошибка.'
                  );
                })
            )
            .catch((err) => {
              setServerErrors('При регистрации пользователя произошла ошибка.');
              console.log(err);
            })
        )
        .catch((err) => {
          setSavedErrorValue(e.target[1].value);
          if (err.statusCode === 409) {
            setServerErrors('Пользователь с таким email уже существует.');
          } else {
            setServerErrors('При регистрации пользователя произошла ошибка.');
          }
        });
    } else if (location.pathname === '/signin') {
      mainApi
        .postToSignin(values)
        .then(() =>
          mainApi
            .getUser()
            .then((res) => updateContextValue(res))
            .catch((err) => {
              console.log(err);
              setServerErrors(
                'При авторизации произошла ошибка. Токен не передан или передан не в том формате.'
              );
            })
        )
        .then(() => {
          onLoggedIn();
          localStorage.setItem('validated', true);
          navigate('/movies');
        })
        .catch((err) => {
          if (!err.message.includes('авторизация')) {
            setServerErrors('Вы ввели неправильный логин или пароль.');
          } else {
            setServerErrors(
              'При авторизации произошла ошибка. Токен не передан или передан не в том формате.'
            );
          }
        });
    }
  };

  const onNavigateLoginOrRegister = () => {
    if (location.pathname === '/signup') {
      navigate('/signin');
    } else if (location.pathname === '/signin') {
      navigate('/signup');
    }
  };
  const chekValidity = () => {
    return (
      (location.pathname === '/signup' && (emptyInputReg || !noErrors)) ||
      (location.pathname === '/signin' && (emptyInputLog || !noErrors)) ||
      serverErrors
    );
  };
  return (
    <section className="register">
      <form
        className="register__container"
        onSubmit={onNavigateFilmsOrLogin}
        noValidate
      >
        <img
          className="register__logo register__logo_margin"
          src={greenCirle}
          alt="лого"
          onClick={onNavigateMain}
        />
        <h2 className="register__title register__title_margin">{sayHi}</h2>
        {inputs.map((input, i) => {
          const { type, name, title } = input;
          return (
            <React.Fragment key={i}>
              <p className="register__input-title register__input-title_margin">
                {title}
              </p>
              <div className="register__input-container">
                <input
                  type={type}
                  className={`register__input ${
                    errors[name] && 'register__input_type_error'
                  }`}
                  required
                  value={values[name]}
                  onChange={onInputChange}
                  name={name}
                />
                <p className="register__error">{errors[name]}</p>
              </div>
              <div className="line line_color_grey register__line_margin" />
            </React.Fragment>
          );
        })}
        <div className="register__server-error-container">
          <button
            type="submit"
            className={`register__button ${margin} ${
              chekValidity() && 'register__button_type_disabled'
            }`}
            disabled={chekValidity()}
          >
            {button[0]}
          </button>
          <p className="register__server-error">{serverErrors}</p>
        </div>
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
      </form>
    </section>
  );
};

export default Register;
