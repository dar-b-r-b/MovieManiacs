import { useState } from "react";
import ReactPaginate from "react-paginate";
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import axios from "axios";
import { serverUrl } from "./config.js";
import DeleteDialog from "./DeleteDialog.js";
function IsWatchedButton({ id, isWatched }) {
  const [watched, setWatched] = useState(isWatched);

  async function handleClick() {
    try {
      await axios.patch(`${serverUrl}/${id}`, {
        isWatched: true,
      });
    } catch (err) {
      console.error(err.toJSON());
    }
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

function MoviesInformation({ movies, setMovies, currentItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const [movieId, setMovieId] = useState("");
  return (
    <>
      {currentItems &&
        currentItems.map((movie) => (
          <div
            key={movie.id}
            className="flex mt-4 mr-28 ml-28 justify-evenly h-24"
          >
            <img
              alt="Обложка фильма"
              src={movie.image ? "" : "film-cover.jpg"}
              className=""
            ></img>
            <div className="flex flex-col justify-evenly basis-72">
              <p>Название: {movie.title}</p>
              <p>Жанр: {movie.genres.join(", ")}</p>
            </div>
            <p className="basis-72 pt-3">{movie.comment}</p>
            <IsWatchedButton id={movie.id} isWatched={movie.isWatched} />

            <button
              className="flex flex-col items-center"
              onClick={() => {
                setIsOpen(true);
                setMovieId(movie.id);
              }}
            >
              <img
                className="size-fit"
                alt="Удалить"
                src="icon-delete-50.png"
              ></img>
            </button>
          </div>
        ))}
      <DeleteDialog
        movieId={movieId}
        movies={movies}
        setMovies={setMovies}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}

export default function Paginate({ movies, setMovies }) {
  const itemsPerPage = 3;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = movies.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(movies.length / itemsPerPage);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % movies.length;
    setItemOffset(newOffset);
  };
  return (
    <>
      <MoviesInformation
        currentItems={currentItems}
        movies={movies}
        setMovies={setMovies}
      />
      <ReactPaginate
        breakLabel="..."
        nextLabel={<GoArrowRight className="w-7 h-7 ml-2" />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel={<GoArrowLeft className="w-7 h-7" />}
        renderOnZeroPageCount={null}
        className="flex flex-row justify-center mt-3 mb-3 items-center text-base indent-2.5"
      />
    </>
  );
}
