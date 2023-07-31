import React from 'react';
import './Movies.css';
import Header from '../BaseComponents/Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../BaseComponents/Footer/Footer';

const Movies = () => {
  return (
    <>
      <Header />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </>
  );
};

export default Movies;