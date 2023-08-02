import React, { useState } from 'react';
import './SearchForm.css';
import tumb from '../../../images/smalltumb.svg';
import '../../Main/AboutmMe/AboutMe.css';
import '../../Main/AboutProject/AboutProject.css';

const SearchForm = ({ onSubmitSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitSearch(searchValue);
  };

  return (
    <section className="search-form">
      <form
        className="search-form__form search-form__form_margin"
        onSubmit={handleSubmit}
      >
        <div className="search-form__input-container">
          <input
            type="text"
            placeholder="Фильм"
            className="search-form__input"
            onChange={handleChange}
          />
          <button type="submit" className="search-form__button"></button>
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
