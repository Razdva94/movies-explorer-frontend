import React from 'react';
import './NavTab.css';

const NavTab = () => {
  return (
    <section className="navtab">
      <nav className="navtab__navbar">
        <a className="navtab__link navtab__link_margin" href="#project">О проекте</a>
        <a className="navtab__link navtab__link_margin" href="#technologies">Технологии</a>
        <a className="navtab__link" href="#student">Студент</a>
      </nav>
    </section>
  );
};

export default NavTab;
