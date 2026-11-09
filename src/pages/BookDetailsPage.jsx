import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function BookDetailsPage() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState({});
  const [reviewData, setReviewData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, [bookId]);

  const getData = async () => {
    setIsLoading(true);
    try {
      const responseBook = await axios.get(
        `${import.meta.env.VITE_JSON_SERVER_URL}/books/${bookId}`,
      );
      const responseReview = await axios.get(
        `${import.meta.env.VITE_JSON_SERVER_URL}/reviews?bookId=${bookId}`,
      );
      setBookDetails(responseBook.data);
      setReviewData(responseReview.data[0] ?? null);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveBook = async (e) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_JSON_SERVER_URL}/books/${bookId}`,
      );
      navigate("/bookshelf");
    } catch (error) {
      console.log(error);
    }
  };

  const statusColors = {
    "Want to read": "bg-[#F8E9C7] text-[#86631E]",
    Reading: "bg-[#D9EFED] text-[#247F80]",
    Finished: "bg-[#DCEFE7] text-[#28694E]",
    "Did not finish": "bg-[#F8DDD5] text-[#A34E3C]",
  };
  if (isLoading) return <h3>Loading...</h3>;

  return (
    <div className="mx-auto max-w-4xl px-4 space-y-8">
      {" "}
      <section className="flex flex-col items-center  py-8 gap-8 md:flex-row md:items-start">
        <div className="book-3d book-3d-large">
          <img
            src={`https://covers.openlibrary.org/b/id/${bookDetails.coverId}-L.jpg`}
            alt="Cover Image"
            className="w-48 object-cover"
          />
        </div>
        <div className="w-full text-center md:flex-1 md:text-left">
          <h1 className="text-3xl font-semibold text-midnight md:text-4xl leading-tight">
            {bookDetails.title}
          </h1>
          <p className="text-lg font-normal text-gray-600 mt-2">
            by {bookDetails.author}
          </p>
          <p className="mt-2">
            Status:
            <span
              className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${statusColors[bookDetails.status]}`}
            >
              {bookDetails.status}
            </span>
          </p>
          <p>My rating: {reviewData?.rating || "Not rated yet"}</p>
        </div>
      </section>
      <hr />
      <section>
        <h2 className="text-2xl font-semibold text-midnight mb-4 text-center">
          About This Book
        </h2>
        <p className="text-gray-700 leading-relaxed text-base">
          {bookDetails.description}
        </p>
      </section>
      <hr />
      <section>
        <h2 className="text-2xl font-semibold text-midnight mb-4 text-center">
          My review
        </h2>
        <p>{reviewData?.comment || "Not reviewed yet"}</p>
      </section>

      <section className="flex justify-between items-center pb-5">
        <button onClick={() => navigate("/bookshelf")} className="border border-gray-300 text-midnight px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium cursor-pointer">Back</button>
        <div className="flex gap-3">
          {" "}
          <Link to={`/bookshelf/${bookId}/edit`} className="bg-enchanted-teal rounded-lg text-white px-4 py-2 hover:bg-[#1D6667] transition-colors font-medium">Edit Book </Link>
          <button type="button" onClick={handleRemoveBook} className="bg-[#A34E3C] rounded-lg text-white px-4 py-2 hover:bg-[#873E30] transition-colors font-medium">
            Remove from Bookshelf
          </button>
        </div>
      </section>
    </div>
  );
}

export default BookDetailsPage;
