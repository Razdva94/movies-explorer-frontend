/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import './Movies.css';
import Header from '../BaseComponents/Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../BaseComponents/Footer/Footer';
import moviesApi from '../../utils/MoviesApi';
import Preloader from './Preloader/Preloader';
import Error from './Error/Error';
import {
  errorMessage,
  errorKeyWord,
  errorRequest,
} from '../../utils/constants';

const Movies = ({ savedMovies }) => {
  const location = useLocation();
  const [movies, setMovies] = useState(null);
  const [tumbValue, setTumbValue] = useState(false);
  const [searchedMovies, setSearchedMovies] = useState(null);
  const [searchedSavedMovies, setSearchedSavedMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [emptyMessage, setEmptyMessage] = useState(false);
  const [clickCounter, setClickCounter] = useState(null);
  const [needKeyWord, setNeedKeyWord] = useState(false);
  const [currentSearchValue, setCurrentSearchValue] = useState('');
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  const savedPrintedString = JSON.parse(localStorage.getItem('printedString'));
  const savedTumvValue = JSON.parse(localStorage.getItem('tumbValue'));
  const savedFilteredMovies = JSON.parse(
    localStorage.getItem('filteredMovies')
  );

  const filterSearch = (string, res) => {
    if (string.trim() === '') {
      return '';
    }
    let filteredMovies = res.filter(
      (movie) =>
        movie.nameRU.toLowerCase().indexOf(string.toLowerCase()) !== -1 ||
        movie.nameEN.toLowerCase().indexOf(string.toLowerCase()) !== -1
    );
    if (tumbValue) {
      filteredMovies = filteredMovies.filter((movie) => movie.duration < 40);
    }
    if (location.pathname === '/movies'){
      localStorage.setItem('printedString', JSON.stringify(string));
      localStorage.setItem('tumbValue', JSON.stringify(tumbValue));
      localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
    }
    return filteredMovies;
  };

  const handleSearch = (searchValue, res) => {
    setError(false);
    setLoading(false);
    setClickCounter(0);
    if (!searchValue) {
      setNeedKeyWord(true);
    } else if (filterSearch(searchValue, res).length === 0) {
      setNeedKeyWord(false);
      setEmptyMessage(true);
    } else {
      setNeedKeyWord(false);
      setEmptyMessage(false);
      if (location.pathname === '/movies'){
        setSearchedMovies(filterSearch(searchValue, res));
      }
      if (location.pathname === '/saved-movies'){
        setIsSearched(true);
        setSearchedSavedMovies(filterSearch(searchValue, res));
      }
    }
  };

  const onSubmitSearch = useCallback((searchValue) => {
    if (location.pathname === '/movies'){
      localStorage.removeItem('filteredMovies');
      localStorage.removeItem('tumbValue');
      localStorage.removeItem('printedString');
    }
    if (!movies && location.pathname === '/movies') {
      setLoading(true);
      moviesApi
        .getMovies()
        .then((res) => {
          setMovies(res);
          handleSearch(searchValue, res);
        })
        .catch((error) => {
          setError(true);
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (location.pathname === '/saved-movies') {
      handleSearch(searchValue, savedMovies);
    } else {
      handleSearch(searchValue, movies);
    }
  });

  const onTumbClick = (searchValue) => {
    console.log(searchValue);
    setTumbValue(!tumbValue);
    setCurrentSearchValue(searchValue);
    setShouldSubmit(true);
  };

  useEffect(() => {
    if (shouldSubmit) {
      onSubmitSearch(currentSearchValue);
      setShouldSubmit(false);
    }
  },
  [shouldSubmit, currentSearchValue, onSubmitSearch]);

  useEffect(() => {
    if (location.pathname === '/movies'){
      setSearchedMovies(savedFilteredMovies);
      setTumbValue(savedTumvValue);
    }
  }, []);
  return (
    <>
      <Header />
      <SearchForm
        onSubmitSearch={onSubmitSearch}
        onTumbClick={onTumbClick}
        tumbValue={tumbValue}
        savedPrintedString={savedPrintedString}
      />
      {loading ? (
        <Preloader />
      ) : error ? (
        <Error message={errorMessage} />
      ) : needKeyWord ? (
        <Error message={errorKeyWord} />
      ) : emptyMessage ? (
        <Error message={errorRequest} />
      ) : (
        <MoviesCardList
          allMovies={movies === null ? savedFilteredMovies : movies}
          searchedMovies={searchedMovies || ''}
          clickCounter={clickCounter}
          setClickCounter={setClickCounter}
          savedMovies={savedMovies}
          searchedSavedMovies={searchedSavedMovies || ''}
          isSearched={isSearched}
        />
      )}
      <Footer />
    </>
  );
};

export default Movies;
