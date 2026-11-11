import { Link } from "react-router-dom";
import { getSavedBooks } from "@/services/api";
import BookLoader from "@/components/BookLoader";
import useFetchBooks from "@/hooks/useFetchBooks";

function BookshelfPage() {
  const { data: shelfBooks, isLoading, error } = useFetchBooks(getSavedBooks);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <BookLoader />
      </div>
    );
  }

  if (error || !shelfBooks) {
    return (
      <h2>
        An error has occurred. The data could not be loaded. Please try again
        later.
      </h2>
    );
  }

  if (shelfBooks.length === 0) {
    return (
      <h2>
        Your vault appears to be empty. Discover some books to start your
        collection.
      </h2>
    );
  }

  return (
    <div>
      <h1 className="text-2xl">Bookshelf Page</h1>
      <section className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-2 md:gap-x-4 gap-y-8">
        {shelfBooks.map((book) => {
          return (
            <div key={book.id}>
              <div className="book-3d aspect-[7/10]">
                <Link to={`/bookshelf/${book.id}`}>
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`}
                    alt="Cover image"
                    className="w-full h-full object-cover min-w-0"
                  />
                </Link>
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
