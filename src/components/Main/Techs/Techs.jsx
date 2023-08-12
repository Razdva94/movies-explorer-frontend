import React from 'react';
import './Techs.css';
import '../AboutProject/AboutProject.css';

const Techs = () => {
  const techs = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB'];
  return (
    <section className="techs">
      <h3 id="technologies" className="title">
        Технологии
      </h3>
      <div className="line line_margin" />
      <h4 className="techs__title techs__title_margin">7 технологий</h4>
      <p className="techs__text techs__text_margin">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <div className="techs__container">
        {techs.map((tech, i) => {
          return <div className="tech__name" key={i}>{tech}</div>;
        }
        )}
      </div>
    </section>
  );
};

export default Techs;
