import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
  const links = [
    { name: 'Статичный сайт', ref: 'https://github.com/Razdva94' },
    { name: 'Адаптивный сайт', ref: 'https://github.com/Razdva94' },
    { name: 'Одностраничное приложение', ref: 'https://github.com/Razdva94' },
  ];

  return (
    <section className="portfolio">
      <h6 className="portfolio__title portfolio__title_margin">
        Портфолио
      </h6>
      {links.map((link, i) => (
        <React.Fragment key={i}>
          <div className="portfolio__link-container">
            <a
              className="portfolio__link"
              href={link.ref}
              target="_blank"
              rel="noreferrer"
            >
              {link.name}
            </a>
            <a
              className="portfolio__link-arrow"
              href={link.ref}
              target="_blank"
              rel="noreferrer"
            >
              ↗
            </a>
          </div>
          {i !== links.length - 1 && (
            <div className="line line_color_grey line_margin-link-portfolio" />
          )}
        </React.Fragment>
      ))}
    </section>
  );
};

export default Portfolio;
