import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditBookPage() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [bookDetails, setBookDetails] = useState({});
  const [reviewData, setReviewData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    status: "",
    rating: 0,
    comment: "",
  });

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
      const formDataObj = {
        status: responseBook.data.status,
        rating: responseReview.data[0]?.rating ?? 0,
        comment: responseReview.data[0]?.comment ?? "",
      };
      setFormData(formDataObj);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <h3>Loading...</h3>;

  const handleFormData = (name, input) => {
    console.log("Form value:", input);
    const stateCopy = { ...formData };
    stateCopy[name] = name === "rating" ? Number(input) : input;
    setFormData(stateCopy);
  };

  const handleSaveData = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(
        `${import.meta.env.VITE_JSON_SERVER_URL}/books/${bookId}`,
        { status: formData.status },
      );
      if (reviewData) {
        await axios.patch(
          `${import.meta.env.VITE_JSON_SERVER_URL}/reviews/${reviewData.id}`,
          { rating: formData.rating, comment: formData.comment },
        );
      } else if (formData.rating !== 0 || formData.comment !== "") {
        await axios.post(`${import.meta.env.VITE_JSON_SERVER_URL}/reviews`, {
          bookId: bookId,
          rating: formData.rating,
          comment: formData.comment,
        });
      }
      navigate(`/bookshelf/${bookId}`);
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
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            step="0.5"
            value={formData.rating}
            onChange={(e) => handleFormData(e.target.name, e.target.value)}
            className="w-24 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-enchanted-teal"
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
