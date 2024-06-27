import "./App.css";
import AddMovieForm from "./AddMovieForm";
const classNameForButtons =
  "rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50";

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

function ButtonRandomMovie() {
  return (
    <button type="button" className={classNameForButtons + " mr-32 mb-6"}>
      Рандомный фильм
    </button>
  );
}

function MoviesInformation() {
  return (
    <div className="flex mt-6 mr-28 ml-28 justify-evenly h-24">
      <img alt="Обложка фильма" src="film-cover.jpg" className=""></img>
      <div className="flex flex-wrap basis-72">
        <p>Название: Non nisi sit commodo culpa quis.</p>
        <p>Жанр: Genre, genre</p>
      </div>
      <p className="basis-72">
        Reprehenderit do proident enim laboris sint sunt cupidatat incididunt
        eu. Commodo consectetur officia enim.
      </p>
      <button className="flex flex-col items-center">
        <img className="size-fit" alt="Просмотрено" src="icon-eye-50.png"></img>
      </button>
      <button className="flex flex-col items-center">
        <img className="size-fit" alt="Удалить" src="icon-delete-50.png"></img>
      </button>
    </div>
  );
}

function App() {
  return (
    <>
      <Header />
      <div className="flex justify-evenly mt-4">
        <ButtonAddMovie />
        <ButtonRandomMovie />
      </div>
      <MoviesInformation />
      <MoviesInformation />
      <MoviesInformation />
      <AddMovieForm />
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </>
  );
}

export default App;
