import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './SavedMovies.css';
import Img1 from "../../../images/img1.jpg";
import Img2 from "../../../images/img2.jpg";
import Img3 from "../../../images/img3.jpg";


function SavedMovies() {

  const savedMoviesData = [
    {
      name: '33 слова о дизайне',
      time: '1ч 47м',
      img: Img1,
    },
    {
      name: '33 слова о дизайне',
      time: '1ч 47м',
      img: Img2,
    },
    {
      name: '33 слова о дизайне',
      time: '1ч 47м',
      img: Img3,
    },
  ];

  return (
    <>
      <Header />
      <main className="saved-movies page__saved-movies">
        <SearchForm />
        <MoviesCardList moviesData={savedMoviesData} />
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;
