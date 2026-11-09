import { useParams } from "react-router-dom";
import { getDiscoverBookDetails } from "@/services/api";
import { useEffect, useState } from "react";

function DiscoverBookDetailsPage() {
  const { workId } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, [workId]);

  const getData = async () => {
    try {
      const response = await getDiscoverBookDetails(workId);
      setBookDetails(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(workId);
  console.log(bookDetails);

  if (isLoading) return <p>Loading...</p>;
  if (!bookDetails) return <p>Book not found</p>;

  return (
    <div className="mx-auto max-w-4xl px-4 space-y-8">
      <section className="flex flex-col items-center  py-8 gap-8 md:flex-row md:items-start">
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
          <p className="text-lg font-normal text-gray-600 mt-2">by Author</p>
    
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
    </div>
  );
}

export default DiscoverBookDetailsPage;
