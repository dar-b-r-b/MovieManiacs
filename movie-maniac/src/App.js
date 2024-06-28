import "./App.css";
import { useState } from "react";
import AddMovieForm from "./AddMovieForm";
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
      <h1 className="mt-4 archivo-black-regular"> Movie Maniacs</h1>
    </header>
  );
}

function ButtonAddMovie() {
  return (
    <button type="button" className={classNameForButtons + " ml-32 mb-6"}>
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
function IsWatchedButton({ id, isWatched }) {
  const [watched, setWatched] = useState(isWatched);
  function handleClick() {
    setWatched(!watched);
  }
  return (
    <button className="flex flex-col items-center" onClick={handleClick}>
      <img
        className="size-fit"
        alt="Просмотрено"
        src={watched ? "icons-closed-eye-50.png" : "icon-eye-50.png"}
      ></img>
    </button>
  );
}

function MoviesInformation({ movies, setMovies }) {
  return (
    <>
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="flex mt-6 mr-28 ml-28 justify-evenly h-24"
        >
          <img alt="Обложка фильма" src={movie.image} className=""></img>
          <div className="flex flex-wrap basis-72">
            <p>Название: {movie.title}</p>
            <p>Жанр: {movie.genres.join(", ")}</p>
          </div>
          <p className="basis-72">{movie.comment}</p>
          <IsWatchedButton id={movie.id} isWatched={movie.isWatched} />
          <button
            className="flex flex-col items-center"
            onClick={() => setMovies(movies.filter((m) => m.id !== movie.id))}
          >
            <img
              className="size-fit"
              alt="Удалить"
              src="icon-delete-50.png"
            ></img>
          </button>
        </div>
      ))}
    </>
  );
}

function App() {
  const [movies, setMovies] = useState(initialMovies);
  return (
    <>
      <Header />
      <div className="flex justify-evenly mt-4">
        <ButtonAddMovie />
        <ButtonRandomMovie movies={movies} setMovies={setMovies} />
      </div>
      <MoviesInformation movies={movies} setMovies={setMovies} />
      <AddMovieForm movies={movies} setMovies={setMovies} />
      <div className="mt-6 flex justify-center">
        <a
          href="/#"
          className="flex items-center justify-center px-2 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
        >
          <svg
            className="w-3.5 h-3.5 me-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
        </a>
        <a
          href="/#"
          className="flex items-center justify-center px-2 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
        >
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </>
  );
}

export default App;
