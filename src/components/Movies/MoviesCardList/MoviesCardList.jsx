import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import moviePic from '../../../images/moviePic.png';

const MoviesCardList = ({ movies }) => {
  const location = useLocation();
  const [elseButton, setElseButton] = useState(false);
  const [maxMoviesToShow, setMaxMoviesToShow] = useState(null);
  const [clickCounter, setClickCounter] = useState(null);
  const movie = {
    movieName: '33 слова о дизайне',
    movieDuration: '1ч42м',
    moviePic: { moviePic },
  };
  let screenWidth = window.innerWidth;
  const updateMaxMoviesToShow = (screenWidth) => {
    if (screenWidth > 1275) {
      setMaxMoviesToShow(16);
    } else if (screenWidth > 986) {
      setMaxMoviesToShow(12);
    } else if (screenWidth > 767) {
      setMaxMoviesToShow(8);
    } else {
      setMaxMoviesToShow(5);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      screenWidth = window.innerWidth;
      if (!clickCounter){
        setTimeout(() => updateMaxMoviesToShow(screenWidth), 100);
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [clickCounter, screenWidth]);

  const renderMovies = (movies, maxMoviesToShow) => {
    const slicedMovies = movies.slice(0, maxMoviesToShow);
    // console.log(maxMoviesToShow); Уборка кнопки ЕЩЕ
    // console.log(slicedMovies.length);
    return slicedMovies.map((movie, index) => (
      <MoviesCard
        key={index}
        movieName={movie.nameRU}
        movieDuration={`${Math.floor(movie.duration / 60)}ч${
          movie.duration - Math.floor(movie.duration / 60) * 60
        }м`}
        moviePic={`https://api.nomoreparties.co/${movie.image.url}`}
      />
    ));
  };

  const onClickElseButton = () => {
    setClickCounter((prevClickCounter) => prevClickCounter + 1);
    console.log(clickCounter);
    if (screenWidth > 1275) {
      setMaxMoviesToShow((prevMaxMoviesToShow) => prevMaxMoviesToShow + 4);
    } else if (screenWidth > 986){
      setMaxMoviesToShow((prevMaxMoviesToShow) => prevMaxMoviesToShow + 3);
    } else {
      setMaxMoviesToShow((prevMaxMoviesToShow) => prevMaxMoviesToShow + 2);
    }
  };

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
  }, [location.pathname, movies, savedMovies, maxMoviesToShow]);

  return (
    <section className="movies">
      <div className="movies-container">
        {location.pathname === '/movies'
          ? renderMovies(movies, maxMoviesToShow)
          : renderMovies(savedMovies, maxMoviesToShow)}
      </div>
      <div className="movies-container_button-container">
        <div>
          {elseButton && (
            <button
              className="movies-container__button"
              type="button"
              onClick={onClickElseButton}
            >
              Ещё
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default MoviesCardList;
