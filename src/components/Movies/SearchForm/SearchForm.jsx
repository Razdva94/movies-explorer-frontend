import React from 'react';
import './SearchForm.css';
import tumb from '../../../images/smalltumb.svg';
import '../../Main/AboutmMe/AboutMe.css';
import '../../Main/AboutProject/AboutProject.css';

const SearchForm = () => {
  return (
    <section className="search-form">
      <form className="search-form__form search-form__form_margin">
        <div className="search-form__input-container">
          <input type="text" placeholder="Фильм" className="search-form__input" />
          <button type="button" className="search-form__button">
          </button>
        </div>
      </form>
      <div className="search-form__tumb-container">
        <img className="search-form__tumb" src={tumb} alt="переключатель" />
        <p className="search-form__text">Короткометражки</p>
      </div>
      <div className="line line_color_grey search-form__line-margin" />
    </section>
  );
};

export default SearchForm;
