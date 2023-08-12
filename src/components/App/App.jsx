import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Authorization/Profile/Profile';
import Register from '../Authorization/Register/Register';
import Login from '../Authorization/Login/Login';
import Error404 from '../Error404/Error404';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import {
  registerInputs,
  loginInputs,
  registerMargin,
  loginMargin,
  sayHiRegister,
  sayHiLogin,
  buttonRegister,
  buttonLogin,
} from '../../utils/constants';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedin] = useState(false);
  const onLoggedIn = () => {
    setLoggedin(true);
  };
  const updateContextValue = (value) => {
    setCurrentUser(value);
    localStorage.setItem('user', JSON.stringify(value));
    console.log(value);
  };
  if (location.pathname === '/movies') {
    localStorage.setItem('location', '/movies');
  } else if (location.pathname === '/profile') {
    localStorage.setItem('location', '/profile');
  } else if (location.pathname === '/saved-movies') {
    localStorage.setItem('location', '/saved-movies');
  }
  useEffect(() => {
    if (localStorage.getItem('validated') === 'true') {
      setLoggedin(true);
      navigate(`${localStorage.getItem('location')}`);
    }
  }, []);

  return (
    <div className="body">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/movies"
          element={
            <ProtectedRouteElement component={<Movies />} loggedIn={loggedIn} />
          }
        />
        <Route
          path="/saved-movies"
          element={(
            <ProtectedRouteElement
              component={<SavedMovies />}
              loggedIn={loggedIn}
            />
          )}
        />
        <Route
          path="/profile"
          element={(
            <ProtectedRouteElement
              component={(
                <CurrentUserContext.Provider value={currentUser}>
                  <Profile updateContextValue={updateContextValue} />
                </CurrentUserContext.Provider>
              )}
              loggedIn={loggedIn}
            />
          )}
        />
        <Route
          path="/signup"
          element={(
            <Register
              updateContextValue={updateContextValue}
              onLoggedIn={onLoggedIn}
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
              updateContextValue={updateContextValue}
              inputs={loginInputs}
              margin={loginMargin}
              sayHi={sayHiLogin}
              button={buttonLogin}
              onLoggedIn={onLoggedIn}
            />
          )}
        />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </div>
  );
};

export default App;
