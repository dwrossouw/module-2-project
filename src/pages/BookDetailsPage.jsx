import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import {
  getReviewDetails,
  deleteBook,
  deleteReview,
  getBookWithReview,
} from "@/services/api";
import BookLoader from "@/components/BookLoader";
import useFetchBooks from "@/hooks/useFetchBooks";

function BookDetailsPage() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, error } = useFetchBooks(getBookWithReview, bookId);

  const bookDetails = data?.book;
  const reviewData = data?.review;

  console.log("Review data: ",reviewData);

  const handleRemoveBook = async () => {
    try {
      if (reviewData) {
        await deleteReview(reviewData.id);
      }
      await deleteBook(bookId);
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

  if (isLoading ) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <BookLoader />
      </div>
    );
  }

  if (error || !bookDetails){
    return (
      <h2>An error has occurred. The data could not be loaded. Please try again later.</h2>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 space-y-8">
      {" "}
      <section className="flex flex-col items-center  pt-8 pb-2 gap-8 md:flex-row md:items-center">
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
          <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
            {bookDetails.genres.map((genre) => (
              <span
                key={genre}
                className="inline-block rounded-full px-3 py-1 text-xs font-medium bg-[#EDE5F5] text-[#70538C]"
              >
                {genre}
              </span>
            ))}
          </div>
          <div className="space-y-2">
            <p className="mt-2">
              Status:
              <span
                className={`inline-block rounded-full px-3 py-1 text-sm font-medium ml-2 ${statusColors[bookDetails.status]}`}
              >
                {bookDetails.status}
              </span>
            </p>
            <p>My rating: {reviewData?.rating || "Not rated yet"}</p>
          </div>
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
        <button
          onClick={() => navigate(location.state?.from ?? "/bookshelf")}
          className="border border-gray-300 text-midnight px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium cursor-pointer"
        >
          Back
        </button>
        <div className="flex gap-3">
          {" "}
          <Link
            to={`/bookshelf/${bookId}/edit`}
            className="bg-enchanted-teal rounded-lg text-white px-4 py-2 hover:bg-[#1D6667] transition-colors font-medium"
          >
            Edit Book{" "}
          </Link>
          <button
            type="button"
            onClick={handleRemoveBook}
            className="bg-[#A34E3C] rounded-lg text-white px-4 py-2 hover:bg-[#873E30] transition-colors font-medium"
          >
            Remove from Bookshelf
          </button>
        </div>
      </section>
    </div>
  );
}

export default BookDetailsPage;
