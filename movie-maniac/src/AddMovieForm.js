import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

function UploadMovieCover({ cover, setCover }) {
  return (
    <div>
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Обложка
      </label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-4">
        <div className="text-center">
          <div className="flex text-sm leading-6 text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-red-800 focus-within:outline-none"
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      </div>
    </div>
  );
}

function InputMovieTitle({ title, setTitle }) {
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
            onChange={(e) => setTitle(e.target.value)}
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
          defaultValue={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
    </div>
  );
}

export default function AddMovieForm({ isOpen, setIsOpen, movies, setMovies }) {
  const [cover, setCover] = useState(null);
  const [title, setTitle] = useState("");
  const [genres, setGenres] = useState("");
  const [comment, setComment] = useState("");

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
                onClick={() => setIsOpen(false)}
              >
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              <div className="flex flex-col w-full">
                <UploadMovieCover cover={cover} setCover={setCover} />
                <InputMovieTitle title={title} setTitle={setTitle} />
                <InputMovieGenre genres={genres} setGenres={setGenres} />
                <InputCommentAboutMovie
                  comment={comment}
                  setComment={setComment}
                />
                <div
                  className="mt-4 flex p-4 text-sm text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  <svg
                    className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="sr-only">Danger</span>
                  <div>
                    <span className="font-medium">
                      Ensure that these requirements are met:
                    </span>
                    <ul className="mt-1.5 list-disc list-inside">
                      <li>At least 10 characters (and up to 100 characters)</li>
                      <li>At least one lowercase character</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 flex justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() =>
                      setMovies([
                        {
                          id: (movies.length + 1).toString(),
                          title,
                          comment,
                          image: "film-cover.jpg",
                          genres: genres.split(", "),
                          isWatched: false,
                        },
                        ...movies,
                      ])
                    }
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
