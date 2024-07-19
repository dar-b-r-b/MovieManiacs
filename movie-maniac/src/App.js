import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { serverUrl } from "./config.js";

import AddMovieForm from "./AddMovieForm";
import Paginate from "./Paginate";
const classNameForButtons =
  "rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50";

function Header() {
  return (
    <header className="flex justify-center">
      <h1 className="mt-3 archivo-black-regular"> Movie Maniacs</h1>
    </header>
  );
}

function ButtonAddMovie({ setIsOpen }) {
  return (
    <button
      type="button"
      className={classNameForButtons + " ml-32 mb-6"}
      onClick={() => setIsOpen(true)}
    >
      Добавить фильм
    </button>
  );
}

function ButtonRandomMovie({ movies, setMovies }) {
  function shuffle(movies) {
    return movies.toSorted(() => Math.random() - 0.5);
  }

  return (
    <button
      type="button"
      className={classNameForButtons + " mr-32 mb-6"}
      onClick={() =>
        setMovies([
          ...shuffle(movies.filter((m) => !m.isWatched)),
          ...shuffle(movies.filter((m) => m.isWatched)),
        ])
      }
    >
      Рандомный фильм
    </button>
  );
}

function App() {
  const [movies, setMovies] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(
    () =>
      async function getMovies() {
        try {
          const response = await axios.get({ serverUrl });
          setMovies(response.data);
        } catch (err) {
          console.error(err.toJSON());
        }
      }
  );
  return (
    <>
      <Header />
      <div className="flex justify-evenly mt-4">
        <ButtonAddMovie setIsOpen={setIsOpen} />
        <ButtonRandomMovie movies={movies} setMovies={setMovies} />
      </div>
      <AddMovieForm
        movies={movies}
        setMovies={setMovies}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <Paginate movies={movies} setMovies={setMovies} />
    </>
  );
}

export default App;
