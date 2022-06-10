import React from "react";
import ArrowSvg from "../../../images/arrow.svg";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio portfolio__page">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/lusyaknowssomething/how-to-learn"
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
