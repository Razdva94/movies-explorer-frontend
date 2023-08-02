/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import './Movies.css';
import Header from '../BaseComponents/Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../BaseComponents/Footer/Footer';
import moviesApi from '../../utils/MoviesApi';
import Preloader from './Preloader/Preloader';
import Error from './Error/Error';
import NothingFinded from './NothingFinded/NothingFinded';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [emptyMessage, setEmptyMessage] = useState(false);
  // const [clickCounter, setClickCounter] = useState(null);
  const filterSearch = (string) => {
    const filteredMovies = movies.filter(
      (movie) =>
        movie.nameRU.toLowerCase().indexOf(string.toLowerCase()) !== -1 ||
        movie.nameEN.toLowerCase().indexOf(string.toLowerCase()) !== -1
    );
    return filteredMovies;
  };
  const onSubmitSearch = (searchValue) => {
    if (filterSearch(searchValue).length === 0) {
      setEmptyMessage(true);
    } else {
      setEmptyMessage(false);
      setSearchedMovies(filterSearch(searchValue));
    }
  };
  useEffect(() => {
    moviesApi
      .getMovies()
      .then((res) => {
        setMovies(res);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <SearchForm onSubmitSearch={onSubmitSearch} />
      {loading ? (
        <Preloader />
      ) : error ? (
        <Error />
      ) : emptyMessage ? (
        <NothingFinded />
      )
        : (
          <MoviesCardList movies={searchedMovies || movies} />
        )}
      <Footer />
    </>
  );
};

export default Movies;
