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
    rating: "",
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
        rating: responseReview.data[0]?.rating,
        comment: responseReview.data[0]?.comment,
      };
      setFormData(formDataObj);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("Edit book page: ", bookDetails);
  console.log(reviewData);
  console.log("Form Data info: ", formData);

  if (isLoading) return <h3>Loading...</h3>;

  const handleFormData = (e) => {};

  return (
    <div className="p-3">
      <div className="w-full max-w-[600px] mx-auto bg-white rounded-lg">
        <section className="flex p-5">
          <img
            src={`https://covers.openlibrary.org/b/id/${bookDetails.coverId}-S.jpg`}
            alt="Cover Image"
            className="w-16 object-cover mr-5 rounded-lg shrink-0"
          />
          <div>
            <h1 className="text-2xl text-midnight">{bookDetails.title}</h1>
            <p className="text-lg font-normal text-gray-600 mt-2">
              {bookDetails.author}
            </p>
          </div>
        </section>
        <hr />
        <section className="p-5">
          <h3>Reading status</h3>
          <select value="Did not finish">
            <option value="Reading">Reading</option>
            <option value="Want to read">Want to read</option>
            <option value="Finished">Finished</option>
            <option value="Did not finish">Did not finish</option>
          </select>
          <h3>My rating</h3>
          <p>{reviewData?.rating}</p>
          <h3>My review</h3>
        </section>
      </div>
    </div>
  );
}

export default EditBookPage;
