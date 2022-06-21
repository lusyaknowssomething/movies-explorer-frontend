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
}) {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <div className="container">
      <Header />
      <main className="saved-movies page__saved-movies">
        <SearchForm onSearchMovies={onSearchMovies} />
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <MoviesCardList
              moviesData={savedMovies}
              handleMovieDelete={handleMovieDelete}
              handleDelete={handleDelete}
            />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
