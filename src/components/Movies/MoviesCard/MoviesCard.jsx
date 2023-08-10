/* eslint-disable no-nested-ternary */
import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import likeIconActive from '../../../images/likeIconActive.svg';
import cross from '../../../images/cross.png';
import mainApi from '../../../utils/MainApi';
import likIconInactive from '../../../images/likeIconInactive.svg';

const MoviesCard = ({
  movieName,
  movieDuration,
  moviePic,
  trailerLink,
  savedFilteredMovies,
  movieId,
  deleteMovie,
  savedMovies,
  isSaved,
}) => {
  const location = useLocation();
  const onClickLike = (e) => {
    const chosenMovie = e.target.closest('div');
    if (location.pathname === '/movies') {
      if (e.target.src.includes('Inactive')) {
        const savedMovie = savedFilteredMovies.filter(
          (movie) => movie.id === Number(chosenMovie.id)
        );
        mainApi.postMovie(savedMovie[0])
          .then(() => {
            e.target.src = likeIconActive;
            localStorage.setItem('filteredMovies', JSON.stringify(savedFilteredMovies.reduce((arr, movie, i) => {
              arr.push(movie);
              if (movie.id === Number(chosenMovie.id)) {
                arr[i].saved = true;
              }
              return arr;
            }, [])));
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (e.target.src.includes('Active')) {
        mainApi.getSavedMovies()
          .then((res) => {
            const savedMovie = res.filter(
              (movie) => movie.movieId === Number(chosenMovie.id)
            )[0];
            console.log(savedMovie);
            mainApi
              .deleteCardFromServer(
                savedMovie._id
              )
              .then(() => {
                e.target.src = likIconInactive;
                localStorage.setItem('filteredMovies', JSON.stringify(savedFilteredMovies.reduce((arr, movie, i) => {
                  arr.push(movie);
                  if (movie.id === savedMovie.movieId) {
                    arr[i].saved = false;
                  }
                  return arr;
                }, [])));
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      }
    } else if (location.pathname === '/saved-movies') {
      mainApi
        .deleteCardFromServer(
          savedMovies.filter(
            (movie) => movie.movieId === Number(chosenMovie.id)
          )[0]._id
        )
        .then(() => {
          deleteMovie(
            savedMovies.filter(
              (movie) => movie.movieId !== Number(chosenMovie.id)
            )
          );
          const filteredMovies = JSON.parse(localStorage.getItem('filteredMovies'));
          const updatedMovies = filteredMovies.map((movie) => {
            if (movie.id === Number(chosenMovie.id)) {
              movie.saved = false;
            }
            return movie;
          });

          localStorage.setItem('filteredMovies', JSON.stringify(updatedMovies));
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="movie-card">
      <a href={trailerLink} target="_blank" rel="noopener noreferrer">
        <img className="movie-card__pic" alt="постер фильма" src={moviePic} />
      </a>
      <div className="movie-card__description-container" id={movieId}>
        <p className="movie-card__description">{movieName}</p>
        <img
          className="movie-card__icon "
          src={
            location.pathname === '/saved-movies'
              ? cross
              : isSaved
                ? likeIconActive
                : likIconInactive
          }
          alt="лайк"
          onClick={onClickLike}
        />
      </div>
      <div className="line line_color_grey" />
      <p className="movie-card__duration">{movieDuration}</p>
    </div>
  );
};

export default MoviesCard;
