import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  addBook,
  getBookDetails,
  getBookWithAuthor
} from "@/services/api";
import { extractGenres } from "@/utils/extractGenres";
import { useEffect, useState } from "react";
import BookLoader from "@/components/BookLoader";
import useFetchBooks from "@/hooks/useFetchBooks";

function DiscoverBookDetailsPage() {
  const { workId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSaved, setIsSaved] = useState(false);

  const {data, isLoading, error} = useFetchBooks (getBookWithAuthor, workId);
  const bookDetails = data?.book;
  const authorDetails = data?.author;

  useEffect(() => {
    checkIfSaved();
  }, [workId]);

  const genres = extractGenres(bookDetails?.subjects?? []);

  const checkIfSaved = async () => {
    try {
      await getBookDetails(workId);
      setIsSaved(true);
    } catch (error) {
      if (error.response?.status === 404) {
        setIsSaved(false);
      } else {
        console.log(error);
      }
    }
  };

  const handleAddBook = async () => {
    const book = {
      id: workId,
      title: bookDetails.title,
      author: authorDetails,
      coverId: bookDetails.covers[0],
      description:
        typeof bookDetails.description === "string"
          ? bookDetails.description
          : (bookDetails.description?.value ?? "No description available."),
      genres: genres,
      status: "Want to read",
    };

    try {
      await addBook(book);
      navigate(`/bookshelf/${workId}`, {state: {from: location.state?.from ?? "/discover"}});
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <BookLoader />
      </div>
    );
  }
  if (!bookDetails) return <p>Book not found</p>;

  return (
    <div className="mx-auto max-w-4xl px-4 space-y-8">
      <section className="flex flex-col items-center  pt-8 pb-2 gap-6 md:flex-row md:items-center">
        <div className="book-3d book-3d-large">
          <img
            src={`https://covers.openlibrary.org/b/id/${bookDetails.covers[0]}-L.jpg`}
            alt="Cover Image"
            className="w-48 object-cover"
          />
        </div>

        <div className="w-full text-center md:flex-1 md:text-left">
          <h1 className="text-3xl font-semibold text-midnight md:text-4xl leading-tight">
            {bookDetails.title}
          </h1>
          <p className="text-lg font-normal text-gray-600 mt-2">
            by {authorDetails}
          </p>
          <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
            {genres.map((genre) => (
              <span
                key={genre}
                className="inline-block rounded-full px-3 py-1 text-xs font-medium bg-[#EDE5F5] text-[#70538C]"
              >
                {genre}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddBook}
            disabled={isSaved}
            className="rounded-lg mt-6 px-5 py-2.5 bg-enchanted-teal hover:bg-[#1D6667] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium disabled:hover:bg-enchanted-teal"
          >
            {isSaved === false ? "Save to Vault" : "Already saved"}
          </button>
        </div>
      </section>
      <hr />
      <section>
        <h2 className="text-2xl font-semibold text-midnight mb-4 text-center">
          About This Book
        </h2>
        <p className="text-gray-700 leading-relaxed text-base max-w-3xl mx-auto whitespace-pre-line">
          {typeof bookDetails.description === "string"
            ? bookDetails.description
            : (bookDetails.description?.value ?? "No description available.")}
        </p>
      </section>
      <section className="flex justify-start pb-5">
        <button
          onClick={() => navigate(location.state?.from ?? "/discover" )}
          className="border border-gray-300 text-midnight px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium cursor-pointer"
        >
          Back
        </button>
      </section>
    </div>
  );
}

export default DiscoverBookDetailsPage;
