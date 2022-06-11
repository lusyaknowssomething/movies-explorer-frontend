import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import "./AboutMe.css";
import StudentPic from "../../../images/Lyudmila.jpg";

function AboutMe() {
  return (
    <section className="about-me page__about-me" id="student">
      <SectionTitle>Студентка</SectionTitle>
      <article className="about-me__article">
        <h3 className="about-me__title">Людмила</h3>
        <p className="about-me__subtitle">Фронтенд-разработчица, 24 года</p>
        <p className="about-me__description">
          Я&nbsp;родилась в&nbsp;Нарьян-Маре, сейчас живу
          в&nbsp;Санкт-Петербурге. Закончила Северный (Арктичекий) федеральный
          университет в&nbsp;г. Архангельск. Училась на&nbsp;направлении
          &laquo;Интеллектуальные системы в&nbsp;гуманитарной сфере&raquo;.
          После выпуска чуть больше года работала маркетологом. Сейчас пробую
          себя в&nbsp;веб-разработке. Почти закончила курс
          от&nbsp;Яндекс.Практикума, а&nbsp;также обучаюсь на&nbsp;программе
          Beeinterns от&nbsp;Билайна на&nbsp;конкурсной основе. Я&nbsp;люблю
          настольные игры, ухаживать за&nbsp;комнатными растениями
          и&nbsp;активный отдых.
        </p>
        <ul className="social-media__list">
          <li className="social-media__item">
            <a
              href="https://t.me/ytvlnv"
              className="social-media__link"
              target="_blank"
              rel="noreferrer"
            >
              Telegram
            </a>
          </li>
          <li className="social-media__item">
            <a
              className="social-media__link"
              href="https://github.com/lusyaknowssomething"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
        <div className="about-me__photo-container">
          <img className="about-me__photo" src={StudentPic} alt="Студентка" />
        </div>
      </article>
    </section>
  );
}

export default AboutMe;
