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
      <div className="flex flex-col items-center">
        <img className="size-fit" alt="" src="icon-eye-50.png"></img>
        <p>Просмотрено</p>
      </div>
      <div className="flex flex-col items-center">
        <img className="size-fit" alt="" src="icon-delete-50.png"></img>
        <p>Удалить</p>
      </div>
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
    </>
  );
}

export default App;
