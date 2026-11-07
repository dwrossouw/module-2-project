import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function BookDetailsPage() {
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, [bookId]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_JSON_SERVER_URL}/books/${bookId}`,
      );
      setBookDetails(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(bookDetails);
  if (isLoading) return <h3>Loading...</h3>;

  return (
    <div className="flex md:flex-row">
      <div className="book-3d book-3d-large">
        <img
          src={`https://covers.openlibrary.org/b/id/${bookDetails.coverId}-L.jpg`}
          alt="Cover Image" className="w-48 object-cover"
        />
      </div>
      <div>
        <h1 className="text-2xl font-semibold">{bookDetails.title}</h1>
        <p>by {bookDetails.author}</p>
        <p>Status: {bookDetails.status}</p>
        <p>My rating: </p>
      </div>
    </div>
  );
}

export default BookDetailsPage;
