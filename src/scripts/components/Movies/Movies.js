import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({
  movies,
  likedMovies,
  onSearchMovies,
  handleMovieLike,
  handleMovieDelete,
  handleDelete,
  startPreloader,
  noMoviesText,
}) {
  return (
    <div className="container">
      <Header />
      <main className="movies page__movies">
        <SearchForm onSearchMovies={onSearchMovies} />
        {startPreloader ? (
          <Preloader />
        ) : !noMoviesText ? (
          <>
            <MoviesCardList
              moviesData={movies}
              likedMovies={likedMovies}
              handleMovieLike={handleMovieLike}
              handleMovieDelete={handleMovieDelete}
              handleDelete={handleDelete}
            />
            <button type="button" className="movies__btn">
              Ещё
            </button>
          </>
        ) : (
          <div className="movies__not-found">{noMoviesText}</div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
