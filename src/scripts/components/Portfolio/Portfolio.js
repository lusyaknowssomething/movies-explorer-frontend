import React from "react";
import ArrowSvg from "../../../images/arrow.svg";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio page__portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/lusyaknowssomething/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
          </a>
          <img
            className="portfolio__icon"
            src={ArrowSvg}
            alt="иконка стрелочка"
          />
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/lusyaknowssomething/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
          </a>
          <img
            className="portfolio__icon"
            src={ArrowSvg}
            alt="иконка стрелочка"
          />
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/lusyaknowssomething/react-mesto-api-full"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
          </a>
          <img
            className="portfolio__icon"
            src={ArrowSvg}
            alt="иконка стрелочка"
          />
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
