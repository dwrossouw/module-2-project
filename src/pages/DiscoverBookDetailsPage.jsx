import { useNavigate, useParams } from "react-router-dom";
import {
  getAuthorDetails,
  getDiscoverBookDetails,
  addBook,
  getBookDetails
} from "@/services/api";
import { useEffect, useState } from "react";

function DiscoverBookDetailsPage() {
  const { workId } = useParams();
  const navigate = useNavigate();

  const [bookDetails, setBookDetails] = useState(null);
  const [authorDetails, setAuthorDetails] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    getData();
    checkIfSaved();
  }, [workId]);

  const getData = async () => {
    setIsLoading(true);
    try {
      const bookResponse = await getDiscoverBookDetails(workId);
      setBookDetails(bookResponse);
      const authorResponse = await getAuthorDetails(
        bookResponse.authors[0].author.key,
      );
      setAuthorDetails(authorResponse);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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
      genres: bookDetails.subjects.slice(0, 3),
      status: "Want to read",
    };

    try {
      await addBook(book);
      navigate(`/bookshelf/${workId}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!bookDetails) return <p>Book not found</p>;

  console.log("Book details: ", bookDetails);
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
          <button type="button" onClick={handleAddBook} disabled={isSaved} className="rounded-lg mt-6 px-5 py-2.5 bg-enchanted-teal hover:bg-[#1D6667] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium disabled:hover:bg-enchanted-teal">
          {isSaved===false ? "Save to Bookshelf":"Already saved"}
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
      <section className="flex justify-start pb-5"><button
          onClick={() => navigate("/discover")}
          className="border border-gray-300 text-midnight px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium cursor-pointer"
        >
          Back
        </button></section>
    </div>
  );
}

export default DiscoverBookDetailsPage;
