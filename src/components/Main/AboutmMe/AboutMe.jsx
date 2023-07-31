import React from 'react';
import './AboutMe.css';
import '../AboutProject/AboutProject.css';
import Me from '../../../images/Me.jpg';

const AboutMe = () => {
  return (
    <section className="about-me">
      <h3 id="student" className="title">
        Студент
      </h3>
      <div className="line line_margin" />
      <img className="about-me__me about-me_margin" src={Me} alt="Моё фото" />
      <h4 className="about-me__title about-me_margin">Данила</h4>
      <h5 className="about-me__subtitle about-me__subtitle_margin">
        Фронтенд-разработчик, 29 лет
      </h5>
      <p className="about-me__text about-me__text_margin">
        Я родился в Санкт-Петербурге. После школы отучился на пилота в Академии
        Граждаской Авиации СПб ГУГа. Потом год служил в армии в роте морской
        пехоты. После дембеля около года работал вторым пилотом в Сургуте, затем
        переехал в родной Санкт-Петербург и продолжил там работу пилотом на
        Airbus a320. В конце сентября 2022 года я был вынужден уволиться с
        работы и уехать в Кыргызстан, потому что иначе мне пришлось бы ехать на
        Донбасс, а туда я ехать не хотел. Примерно в это же время, я осознал,
        что мне придется искать новую профессию и решил пройти курсы Фронтенд
        разработчика в Яндексе. Хочу работать программистом и получать 300к в
        наносекунду.
      </p>
      <a
        className="about-me__github about-me__github_margin"
        href="https://github.com/Razdva94"
        target="_blank"
        rel="noreferrer"
      >
        Github
      </a>
    </section>
  );
};

export default AboutMe;
