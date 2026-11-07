import { useState, useEffect } from "react";
import axios from "axios";

function BookshelfPage() {
  const [shelfBooks, setShelfBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    console.log("request initiated");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_JSON_SERVER_URL}/books`,
      );
      setShelfBooks(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  console.log(shelfBooks);
  return (
    <div>
      <h1 className="text-2xl">Bookshelf Page</h1>
      <section className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-2 md:gap-x-4 gap-y-8">
        {shelfBooks.map((book) => {
          return (
            <div key={book.id}>
              <div className="book-3d aspect-[7/10]">
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`}
                  alt="Cover image"
                  className="w-full h-full object-cover min-w-0"
                />
              </div>
              
              <p>{book.title}</p>
              <p>{book.author}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default BookshelfPage;
