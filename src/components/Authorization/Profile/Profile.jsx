import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import Header from '../../BaseComponents/Header/Header';
import './Profile.css';
import mainApi from '../../../utils/MainApi';
import useForm from '../../../hooks/useForm';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import Popup from '../../Popup/Popup';

const Profile = ({ updateContextValue }) => {
  const currentUser = useContext(CurrentUserContext);
  const [popupMessage, setPopupMessage] = useState('');
  const { values, handleChange, setValues } = useForm({ name: '', email: '' });
  const [resultName, setResultName] = useState('');
  const [email, setEmail] = useState('');
  const [saveButton, setSaveButton] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitErr, setSubmitErr] = useState('');
  const [popupState, setPopupState] = useState(false);
  const emptyInput = Object.values(values).some((value) => value === '');
  const navigate = useNavigate();

  const closePopup = () => {
    setTimeout(() => setPopupState(false), 2000);
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };
    handleChange(e);
    setSubmitErr('');
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
  const noErrors = Object.values(errors).length === 0;
  const onExit = () => {
    mainApi.getToSignout().then(() => {
      localStorage.clear();
      navigate('/');
    });
  };
  const onSubmitInfo = (e) => {
    e.preventDefault();
    mainApi
      .changeProfileInfo(values)
      .then(() => {
        setResultName(values.name);
        setEmail(values.email);
        updateContextValue(values);
        setSaveButton(false);
        setPopupMessage('Данные успешно изменены');
        setPopupState(true);
        closePopup();
        setValues({ name: '', email: '' });
      })
      .catch((err) => {
        setPopupMessage('Что-то пошло не так');
        setPopupState(true);
        closePopup();
        if (err.statusCode === 400) {
          setSubmitErr(err.message);
        } else if (err.statusCode === 401) {
          localStorage.clear();
          navigate('/');
        } else {
          setSubmitErr('При обновлении профиля произошла ошибка.');
        }
        console.log(err);
      });
  };
  const onEdit = () => {
    setSaveButton(true);
    setValues({ name: resultName, email });
  };
  useEffect(() => {
    if (currentUser) {
      setResultName(currentUser.name);
      setEmail(currentUser.email);
      localStorage.setItem('user', JSON.stringify(currentUser));
    } else {
      const user = JSON.parse(localStorage.getItem('user'));
      updateContextValue(user);
      setEmail(user.email);
      setResultName(user.name);
    }
  }, [currentUser, updateContextValue]);

  useEffect(() => {
    if (values.name === resultName && values.email === email) {
      setSubmitErr('Данные не изменены');
    }
  }, [email, resultName, values.email, values.name]);
  console.log(values);
  return (
    <>
      <Header />
      <section className="profile">
        <h2 className="profile__header profile__header_margin">
          Привет,
          {` ${resultName}`}
          !
        </h2>
        <form
          className="profile__form profile__form_margin"
          noValidate
          onSubmit={onSubmitInfo}
        >
          <div className="profile__input-container">
            <input
              type="text"
              className="profile__input"
              placeholder="Имя"
              disabled={!saveButton}
              name="name"
              value={values.name}
              onChange={onInputChange}
            />
            <p className="register__error" style={{ margin: 0 }}>
              {errors.name}
            </p>
            <p className="profile__input-result">{resultName}</p>
          </div>
          <div className="line line_color_grey profile__line_margin" />
          <div className="profile__input-container">
            <input
              type="text"
              className="profile__input"
              placeholder="E-mail"
              disabled={!saveButton}
              name="email"
              value={values.email}
              onChange={onInputChange}
            />
            <p className="register__error" style={{ margin: 0 }}>
              {errors.email}
            </p>
            <p className="profile__input-result">{email}</p>
          </div>
          {saveButton && (
            <div className="register__server-error-container">
              <button
                type="submit"
                className={`register__button profile__change_margin ${
                  (!noErrors || submitErr || emptyInput) &&
                  'register__button_type_disabled'
                }`}
                disabled={!noErrors || submitErr || emptyInput}
              >
                Сохранить
              </button>
              <p className="register__server-error">{submitErr}</p>
            </div>
          )}
        </form>
        {!saveButton && (
          <>
            <button
              type="button"
              className="profile__change profile__change_margin"
              onClick={onEdit}
            >
              Редактировать
            </button>
            <button
              type="button"
              className="profile__exit profile__exit_margin"
              onClick={onExit}
            >
              Выйти из аккаунта
            </button>
          </>
        )}
      </section>
      {popupState && <Popup message={popupMessage} />}
    </>
  );
};

export default Profile;
