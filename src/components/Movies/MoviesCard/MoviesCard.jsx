import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import likeIconActive from '../../../images/likeIconActive.svg';
import cross from '../../../images/cross.png';

const MoviesCard = ({ movieName, movieDuration, moviePic }) => {
  const location = useLocation();
  return (
    <div className="movie-card">
      <img className="movie-card__pic" alt="постер фильма" src={moviePic} />
      <div className="movie-card__description-container">
        <p className="movie-card__description">{movieName}</p>
        <img
          className="movie-card__icon"
          src={location.pathname === '/saved-movies' ? cross : likeIconActive}
          alt="лайк"
        />
      </div>
      <div className="line line_color_grey" />
      <p className="movie-card__duration">{movieDuration}</p>
    </div>
  );
};

export default MoviesCard;
