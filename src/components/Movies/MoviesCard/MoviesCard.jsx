import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import likeIconActive from '../../../images/likeIconActive.svg';
import cross from '../../../images/cross.png';
import mainApi from '../../../utils/MainApi';

const MoviesCard = ({
  movieName,
  movieDuration,
  moviePic,
  trailerLink,
  allMovies,
  movieId,
}) => {
  const location = useLocation();
  const onClickLike = (e) => {
    const chosenMovie = e.target.closest('div');
    const savedMovie = allMovies.filter((movie) => movie.id === Number(chosenMovie.id));
    mainApi.postMovie(savedMovie[0])
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="movie-card">
      <a href={trailerLink} target="_blank" rel="noopener noreferrer">
        <img className="movie-card__pic" alt="постер фильма" src={moviePic} />
      </a>
      <div className="movie-card__description-container" id={movieId}>
        <p className="movie-card__description">{movieName}</p>
        <img
          className="movie-card__icon"
          src={location.pathname === '/saved-movies' ? cross : likeIconActive}
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
