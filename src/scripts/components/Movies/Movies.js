import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ movies, onSearchMovies }) {


  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <div className="container">
      <Header />
      <main className="movies page__movies">
        <SearchForm onSearchMovies={onSearchMovies} />
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <MoviesCardList moviesData={movies} />
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
