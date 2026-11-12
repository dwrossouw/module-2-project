import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addReview,
  updateReview,
  updateStatus,
  getBookWithReview,
} from "@/services/api";
import BookLoader from "@/components/BookLoader";
import useFetchBooks from "@/hooks/useFetchBooks";
import RatingSystem from "@/components/RatingSystem";

function EditBookPage() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    status: "",
    rating: null,
    comment: "",
  });

  const { data, isLoading, error } = useFetchBooks(getBookWithReview, bookId);
  const bookDetails = data?.book;
  const reviewData = data?.review;

  useEffect(() => {
    if (bookDetails) {
      const formDataObj = {
        status: bookDetails.status,
        rating: reviewData?.rating ?? null,
        comment: reviewData?.comment ?? "",
      };
      setFormData(formDataObj);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <BookLoader />
      </div>
    );
  }

  const handleFormData = (name, input) => {
    const stateCopy = { ...formData };
    stateCopy[name] = input;
    setFormData(stateCopy);
  };

  const handleSaveData = async (e) => {
    e.preventDefault();

    try {
      await updateStatus(bookId, formData.status);

      if (reviewData) {
        await updateReview(reviewData.id, formData.rating, formData.comment);
      } else if (formData.rating !== null || formData.comment !== "") {
        await addReview(bookId, formData.rating, formData.comment);
      }
      navigate(`/bookshelf`, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3">
      <div className="w-full max-w-[600px] mx-auto bg-white rounded-lg shadow-sm">
        <section className="flex p-5">
          <div className="book-3d book-3d-edit">
            <img
              src={`https://covers.openlibrary.org/b/id/${bookDetails.coverId}-S.jpg`}
              alt="Cover Image"
            />
          </div>

          <div>
            <h1 className="text-2xl text-midnight">{bookDetails.title}</h1>
            <p className="text-lg font-normal text-gray-600 mt-2">
              {bookDetails.author}
            </p>
          </div>
        </section>

        <hr />

        <section className="p-5 space-y-5">
          <h3 className="text-sm font-semibold text-midnight mb-2">
            Reading status
          </h3>
          <select
            onChange={(e) => handleFormData(e.target.name, e.target.value)}
            value={formData.status}
            name="status"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-enchanted-teal"
          >
            <option value="Reading">Reading</option>
            <option value="Want to read">Want to read</option>
            <option value="Finished">Finished</option>
            <option value="Did not finish">Did not finish</option>
          </select>
          <h3 className="text-sm font-semibold text-midnight mb-2">
            My rating
          </h3>
          <RatingSystem
            value={formData.rating}
            onChange={(_, newValue) => handleFormData("rating", newValue)}
            readOnly={false}
            size="medium"
          />
          <h3 className="text-sm font-semibold text-midnight mb-2">
            My review
          </h3>
          <textarea
            onChange={(e) => handleFormData(e.target.name, e.target.value)}
            value={formData?.comment ? formData.comment : ""}
            name="comment"
            className="w-full min-h-32 border border-gray-300 rounded-lg p-3 resize-y focus:outline-none focus:ring-2 focus:ring-enchanted-teal"
          ></textarea>
        </section>
        <div className="flex justify-end gap-3 p-5">
          <button
            type="button"
            onClick={() => navigate(`/bookshelf/${bookId}`)}
            className="bg-gray-100 text-midnight px-5 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSaveData}
            className="bg-enchanted-teal text-white px-5 py-2 rounded-lg hover:opacity-90 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditBookPage;
