import "./App.css";
import { useState } from "react";

import AddMovieForm from "./AddMovieForm";
import Paginate from "./Paginate";
const classNameForButtons =
  "rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50";

const initialMovies = [
  {
    id: "1",
    title: "Земля кочевников",
    image: "Nomadland.jpg",
    comment: "Рейтинг IMDb 7.3",
    genres: ["драма"],
    isWatched: false,
  },
  {
    id: "2",
    title: "Бескрайний бассейн",
    image: "Infinity Pool.jpg",
    comment: "",
    genres: ["фантастика", "триллер"],
    isWatched: true,
  },
  {
    id: "3",
    title: "Дом дракона",
    image: "House of the Dragon.jpg",
    comment: "Сериал",
    genres: ["фэнтези", "боевик"],
    isWatched: false,
  },
];

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
  const [movies, setMovies] = useState(initialMovies);
  const [isOpen, setIsOpen] = useState(false);
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
