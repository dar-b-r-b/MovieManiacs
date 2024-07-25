import { Description, Dialog, DialogPanel } from "@headlessui/react";
import axios from "axios";
import { serverUrl } from "./config.js";

export default function DeleteDialog({
  movieId,
  movies,
  setMovies,
  isOpen,
  setIsOpen,
}) {
  async function deleteMovie() {
    try {
      const response = await axios.delete(`${serverUrl}/${movieId}`);
      console.log(movieId);
      console.log(response);
      setMovies(movies.filter((m) => m.id !== movieId));
    } catch (err) {
      console.error(err.toJSON());
    }
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            autoFocus
            className="max-w-lg space-y-4 border bg-white p-12 border-red-950"
          >
            <Description>Удалить фильм из списка?</Description>

            <div className="flex justify-evenly gap-8">
              <button onClick={() => setIsOpen(false)}>Отмена</button>
              <button
                className="rounded-md bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                  setIsOpen(false);

                  deleteMovie();
                }}
              >
                Удалить
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
