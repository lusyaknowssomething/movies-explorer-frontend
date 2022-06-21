import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./SavedMovies.css";
import Preloader from "../Preloader/Preloader";

function SavedMovies({
  savedMovies,
  onSearchMovies,
  handleMovieDelete,
  handleDelete,
  startPreloader,
  noMoviesText,
}) {
  return (
    <div className="container">
      <Header />
      <main className="saved-movies page__saved-movies">
        <SearchForm onSearchMovies={onSearchMovies} />
        {startPreloader ? (
          <Preloader />
        ) : !noMoviesText ? (
          <MoviesCardList
            moviesData={savedMovies}
            handleMovieDelete={handleMovieDelete}
            handleDelete={handleDelete}
          />
        ) : (
          <div className="movies__not-found">{noMoviesText}</div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
