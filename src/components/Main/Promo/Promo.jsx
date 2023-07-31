import React from 'react';
import './Promo.css';
import promoPic from '../../../images/promoPic.png';

function Promo() {
  return (
    <section className="promo">
      <img className="promo__pic promo__pic_margin" src={promoPic} alt="промо лого" />
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
    </section>
  );
}

export default Promo;