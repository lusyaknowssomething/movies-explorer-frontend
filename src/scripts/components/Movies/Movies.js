import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Img1 from "../../../images/img1.jpg";
import Img2 from "../../../images/img2.jpg";
import Img3 from "../../../images/img3.jpg";
import Img4 from "../../../images/img4.jpg";
import Img5 from "../../../images/img5.jpg";
import Img6 from "../../../images/img6.jpg";
import Img7 from "../../../images/img7.jpg";
import Img8 from "../../../images/img8.jpg";
import Img9 from "../../../images/img9.jpg";
import Img10 from "../../../images/img10.jpg";
import Img11 from "../../../images/img11.jpg";
import Img12 from "../../../images/img12.jpg";

function Movies() {
  const MoviesData = [
    {
      name: "33 слова о дизайне",
      time: "1ч 47м",
      img: Img1,
    },
    {
      name: "33 слова о дизайне",
      time: "1ч 47м",
      img: Img2,
    },
    {
      name: "33 слова о дизайне",
      time: "1ч 47м",
      img: Img3,
    },
    {
      name: "33 слова о дизайне",
      time: "1ч 47м",
      img: Img4,
    },
    {
      name: "33 слова о дизайне",
      time: "1ч 47м",
      img: Img5,
    },
    {
      name: "33 слова о дизайне",
      time: "1ч 47м",
      img: Img6,
    },
    {
      name: "33 слова о дизайне",
      time: "1ч 47м",
      img: Img7,
    },
    {
      name: "33 слова о дизайне",
      time: "1ч 47м",
      img: Img8,
    },
    {
      name: "33 слова о дизайне",
      time: "1ч 47м",
      img: Img9,
    },
    {
      name: "33 слова о дизайне",
      time: "1ч 47м",
      img: Img10,
    },
    {
      name: "33 слова о дизайне",
      time: "1ч 47м",
      img: Img11,
    },
    {
      name: "33 слова о дизайне",
      time: "1ч 47м",
      img: Img12,
    },
  ];

  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <div className="container">
      <Header />
      <main className="movies page__movies">
        <SearchForm />
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <MoviesCardList moviesData={MoviesData} />
            <button type="button" className="movies__btn">
              Ещё
            </button>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
