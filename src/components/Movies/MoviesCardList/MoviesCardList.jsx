import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import moviePic from '../../../images/moviePic.png';

const MoviesCardList = () => {
  const location = useLocation();
  const [elseButton, setElseButton] = useState(false);
  const movie = {
    movieName: '33 слова о дизайне',
    movieDuration: '1ч42м',
    moviePic,
  };
  const movies = Array.from({ length: 16 }, () => movie);
  const savedMovies = Array.from({ length: 3 }, () => movie);

  useEffect(() => {
    if (location.pathname === '/movies' && movies.length < 16) {
      setElseButton(false);
    } else if (
      location.pathname === '/saved-movies' &&
      savedMovies.length < 16
    ) {
      setElseButton(false);
    } else {
      setElseButton(true);
    }
  }, [location.pathname, movies.length, savedMovies.length]);

  const renderMovies = (movies) => {
    let maxMoviesToShow = 16;
    const screenWidth = window.innerWidth;
    if (screenWidth <= 850) {
      maxMoviesToShow = 8;
    }
    if (screenWidth <= 450) {
      maxMoviesToShow = 5;
    }
    const slicedMovies = movies.slice(0, maxMoviesToShow);
    return slicedMovies.map((movie, index) => (
      <MoviesCard
        key={index}
        movieName={movie.movieName}
        movieDuration={movie.movieDuration}
        moviePic={movie.moviePic}
      />
    ));
  };

  return (
    <section className="movies">
      <div className="movies-container">
        {location.pathname === '/movies'
          ? renderMovies(movies)
          : renderMovies(savedMovies)}
      </div>
      <div className="movies-container_button-container">
        <div>
          {elseButton && (
            <button className="movies-container__button" type="button">
              Ещё
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default MoviesCardList;
