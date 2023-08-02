import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Authorization/Profile/Profile';
import Register from '../Authorization/Register/Register';
import Login from '../Authorization/Login/Login';
import Error404 from '../Error404/Error404';
// import moviesApi from '../../utils/MoviesApi';

const App = () => {
  // useEffect(() => {
  //   moviesApi.getMovies()
  //     . then((res) => {
  //       console.log(res);
  //     });
  // }, []);

  const registerInputs = [
    { title: 'Имя', type: 'text' },
    { title: 'E-mail', type: 'e-mail' },
    { title: 'Пароль', type: 'password' },
  ];

  const loginInputs = [
    { title: 'E-mail', type: 'e-mail' },
    { title: 'Пароль', type: 'password' },
  ];
  const registerMargin = 'register__button_margin';
  const loginMargin = 'login__button_margin';
  const sayHiRegister = 'Добро пожаловать!';
  const sayHiLogin = 'Рады видеть!';
  const buttonRegister = [
    'Зарегистрироваться',
    'Уже зарегистрированы?',
    ' Войти',
  ];
  const buttonLogin = ['Войти', 'Еще не зарегистрированы?', ' Регистрация'];
  return (
    <div className="body">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/signup"
          element={(
            <Register
              inputs={registerInputs}
              margin={registerMargin}
              sayHi={sayHiRegister}
              button={buttonRegister}
            />
          )}
        />
        <Route
          path="/signin"
          element={(
            <Login
              inputs={loginInputs}
              margin={loginMargin}
              sayHi={sayHiLogin}
              button={buttonLogin}
            />
          )}
        />
        <Route path="/error-404" element={<Error404 />} />
      </Routes>
    </div>
  );
};

export default App;
