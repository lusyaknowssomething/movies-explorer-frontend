import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project page__about-project" id="about">
      <SectionTitle>О проекте</SectionTitle>
      <article className="about-project__article">
        <section className="about-project__section">
          <h3 className="about-project__section-title">
            Дипломный проект включал 5&nbsp;этапов
          </h3>
          <p className="about-project__section-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и&nbsp;финальные доработки.
          </p>
        </section>
        <section className="about-project__section">
          <h3 className="about-project__section-title">
            На&nbsp;выполнение диплома ушло 5&nbsp;недель
          </h3>
          <p className="about-project__section-text">
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые
            нужно было соблюдать,&nbsp;чтобы успешно защититься.
          </p>
        </section>
      </article>
      <div className="scale">
        <div className="scale__section">
          <p className="scale__text">1 неделя</p>
        </div>
        <div className="scale__section">
          <p className="scale__text">4 недели</p>
        </div>
        <div className="scale__section">
          <p className="scale__under-text">Back-end</p>
        </div>
        <div className="scale__section">
          <p className="scale__under-text">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
