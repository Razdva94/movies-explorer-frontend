import React from 'react';
import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import Header from '../BaseComponents/Header/Header';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutmMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import Footer from '../BaseComponents/Footer/Footer';

function Main() {
  return (
    <>
      <Header />
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </>
  );
}

export default Main;
