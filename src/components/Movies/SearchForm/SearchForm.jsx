import React from 'react';
import { useLocation } from 'react-router-dom';
import useForm from '../../../hooks/useForm';
import './SearchForm.css';
import tumb from '../../../images/smalltumb.svg';
import tumbOff from '../../../images/smalltumboff.svg';
import '../../Main/AboutmMe/AboutMe.css';
import '../../Main/AboutProject/AboutProject.css';

const SearchForm = ({
  onSubmitSearch,
  onTumbClick,
  tumbValue,
  savedPrintedString,
}) => {
  const location = useLocation();
  const { values, handleChange } = useForm({
    searchForm: location.pathname === '/movies' ? savedPrintedString : '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitSearch(values.searchForm);
  };
  const handleClick = () => {
    onTumbClick(values.searchForm);
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
            value={values.searchForm ? values.searchForm : ''}
            name="searchForm"
          />
          <button type="submit" className="search-form__button"></button>
        </div>
      </form>
      <div className="search-form__tumb-container">
        <img
          className="search-form__tumb"
          onClick={handleClick}
          src={tumbValue ? tumb : tumbOff}
          alt="переключатель"
        />
        <p className="search-form__text">Короткометражки</p>
      </div>
      <div className="line line_color_grey search-form__line-margin" />
    </section>
  );
};

export default SearchForm;
