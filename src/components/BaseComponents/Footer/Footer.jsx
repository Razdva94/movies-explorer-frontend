import React from 'react';
import './Footer.css';
import '../../Main/AboutmMe/AboutMe.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__text footer__text_color_grey">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="line line_color_grey line_margin-link" />
      <div className="footer__container">
        <p className="footer__text footer__text_type_year">
          ©
          {currentYear}
        </p>
        <p className="footer__text">Яндекс.Практикум</p>
        <a
          className="footer__github"
          href="https://github.com/Razdva94"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
      </div>
    </footer>
  );
};

export default Footer;
