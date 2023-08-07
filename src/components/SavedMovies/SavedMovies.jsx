import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import mainApi from '../../utils/MainApi';
import Movies from '../Movies/Movies';

const SavedMovies = () => {
  const [savedMovies, setSavedMovies] = useState([]);
  const location = useLocation();
  useEffect(() => {
    mainApi
      .getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
      })
      .catch((err) => console.log(err));
  }, [location.pathname]);
  return <Movies savedMovies={savedMovies} />;
};

export default SavedMovies;
