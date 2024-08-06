import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { PropTypes } from "prop-types";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { serverUrl } from "./config.js";

function UploadMovieCover({ cover, setCover, coverDataURL, setCoverDataURL }) {
  const changeHandler = (e) => {
    setCover(e.target.files[0]);
  };
  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (cover) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setCoverDataURL(result);
        }
      };
      fileReader.readAsDataURL(cover);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [cover]);

  return (
    <>
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Обложка
      </label>
      <div className="flex flex-row">
        <div className="mt-2 flex justify-evenly grow rounded-lg border border-dashed border-gray-900/25 px-6 py-4">
          <div className="flex text-sm leading-6 text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative self-center cursor-pointer rounded-md bg-white font-semibold text-red-800 focus-within:outline-none"
            >
              <span>Загрузите обложку</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={changeHandler}
              />
            </label>
          </div>
        </div>
        {coverDataURL ? (
          <p className="flex mt-2 ml-3 size-52 justify-center">
            {<img src={coverDataURL} alt="preview" />}
          </p>
        ) : null}
      </div>
    </>
  );
}

function InputMovieTitle({ title, setTitle, isDisabled, setIsDisabled }) {
  return (
    <div className="mt-4 flex flex-col gap-x-6 gap-y-8">
      <div className="sm:col-span-3">
        <label
          htmlFor="movie-name"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Название
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="movie-name"
            id="movie-name"
            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            onChange={(e) => {
              setTitle(e.target.value);
              isDisabled ? setIsDisabled(false) : setIsDisabled("");
            }}
            value={title}
          />
        </div>
      </div>
    </div>
  );
}

function InputMovieGenre({ genres, setGenres }) {
  return (
    <div className="mt-4 flex flex-col gap-x-6 gap-y-8">
      <div className="sm:col-span-3">
        <label
          htmlFor="movie-genre"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Жанры
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="movie-genre"
            id="movie-genre"
            className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            onChange={(e) => setGenres(e.target.value)}
            value={genres}
          />
        </div>
      </div>
    </div>
  );
}
function InputCommentAboutMovie({ comment, setComment }) {
  return (
    <div className="mt-4">
      <label
        htmlFor="about"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Комментарий
      </label>
      <div className="mt-2">
        <textarea
          id="comment"
          name="comment"
          rows={2}
          className=" pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
    </div>
  );
}

UploadMovieCover.propTypes = {
  cover: PropTypes.any,
  setCover: PropTypes.func,
  coverDataURL: PropTypes.string,
  setCoverDataURL: PropTypes.func,
};

InputMovieTitle.propTypes = {
  title: PropTypes.string,
  setTitle: PropTypes.func,
  isDisabled: PropTypes.bool,
  setIsDisabled: PropTypes.func,
};

InputMovieGenre.propTypes = {
  genres: PropTypes.string,
  setGenres: PropTypes.func,
};

InputCommentAboutMovie.propTypes = {
  comment: PropTypes.string,
  setComment: PropTypes.func,
};

AddMovieForm.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  movies: PropTypes.arrayOf(PropTypes.object),
  setMovies: PropTypes.func,
};

export default function AddMovieForm({ isOpen, setIsOpen, movies, setMovies }) {
  const [cover, setCover] = useState(null);
  const [coverDataURL, setCoverDataURL] = useState(null);
  const [title, setTitle] = useState("");
  const [genres, setGenres] = useState("");
  const [comment, setComment] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [activeIndex, setActiveIndex] = useState("");
  const [copies, setCopies] = useState([]);

  function clearInputFields() {
    setCover(null);
    setTitle("");
    setGenres("");
    setComment("");
    console.log(1);
    setCoverDataURL(null);
    console.log(coverDataURL);
  }

  async function addMovieInList(newMovie) {
    try {
      const formData = new FormData();
      formData.append("title", newMovie.title);
      formData.append("comment", newMovie.comment);
      for (let i = 0; i < newMovie.genres.length; i++) {
        formData.append("genres", newMovie.genres[i]);
      }
      formData.append("image", newMovie.cover);

      const response = await axios.post(`${serverUrl}/movies`, formData, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      });
      setCurrentId(response.data.movie.id);
      setMovies([response.data.movie, ...movies]);
      console.log(response.data.copies);
      const copiesList = response.data.copies.filter((x) => x.score > 80);
      if (copiesList.length) {
        setActiveIndex(2);
        setCopies(copiesList.map((t) => t.title));
      } else {
        setActiveIndex(1);
        clearInputFields();
      }
    } catch (err) {
      console.error(err.toJSON());
    }

    setIsDisabled(true);
  }

  async function deleteNewMovie(id) {
    try {
      await axios.delete(`${serverUrl}/movies/${id}`);
    } catch (err) {
      console.error(err.toJSON());
    }

    setMovies(movies.filter((m) => m.id !== id));
  }
  return (
    <Dialog className="relative z-10" open={isOpen} onClose={setIsOpen}>
      <DialogBackdrop
        transition
        className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <DialogPanel
            transition
            className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-3xl"
          >
            <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-4 sm:top-6 md:right-4 md:top-4 lg:right-6 lg:top-6"
                onClick={() => {
                  setIsOpen(false);
                  setIsDisabled(false);
                  clearInputFields();
                  setActiveIndex(0);
                }}
              >
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              <div className="flex flex-col w-full">
                <UploadMovieCover
                  cover={cover}
                  setCover={setCover}
                  coverDataURL={coverDataURL}
                  setCoverDataURL={setCoverDataURL}
                />
                <InputMovieTitle
                  title={title}
                  setTitle={setTitle}
                  isDisabled={isDisabled}
                  setIsDisabled={setIsDisabled}
                />
                <InputMovieGenre genres={genres} setGenres={setGenres} />
                <InputCommentAboutMovie
                  comment={comment}
                  setComment={setComment}
                />

                <div
                  className="p-4 mt-3 mb-4 text-sm text-green-800 rounded-lg bg-green-50 "
                  role="alert"
                  hidden={activeIndex !== 1}
                >
                  <svg
                    className="flex-shrink-0 inline w-4 h-4 me-3 mb-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="font-medium">
                    Фильм добавлен и обречен на забвение
                  </span>
                </div>

                <div
                  className="mt-4 p-4 text-sm text-red-800 rounded-lg bg-red-50"
                  role="alert"
                  hidden={activeIndex !== 2 && activeIndex !== 3}
                >
                  <div>
                    <svg
                      className="flex-shrink-0 inline w-4 h-4 me-3 mb-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="font-medium">
                      Найдены фильмы с похожим названием:
                    </span>
                    <ul className="mt-1.5 list-disc list-inside">
                      {copies.map((m) => (
                        <li key={uuidv4()}>{m}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div
                  className="p-4 mt-3 mb-4 text-sm text-green-800 rounded-lg bg-green-50 "
                  role="alert"
                  hidden={activeIndex !== 3}
                >
                  <svg
                    className="flex-shrink-0 inline w-4 h-4 me-3 mb-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="font-medium">Фильм удален</span>
                </div>

                <div className="mt-4 flex justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                    onClick={() => {
                      setIsDisabled(true);
                      setActiveIndex(3);
                      deleteNewMovie(currentId);
                      clearInputFields();
                    }}
                  >
                    Удалить
                  </button>
                  <button
                    type="submit"
                    disabled={isDisabled}
                    className="rounded-md bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => {
                      title !== ""
                        ? addMovieInList({
                            title,
                            comment,
                            cover,
                            genres: genres.split(", "),
                          })
                        : setIsDisabled(true);
                    }}
                  >
                    Сохранить
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
