import { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { searchBooksQuery } from "@/services/api";
import BookLoader from "@/components/BookLoader";
import SearchBar from "@/components/SearchBar";
import BookCard from "@/components/BookCard";

function SearchResultsPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const location = useLocation();
  
  useEffect(() => {
    getData();
  }, [query]);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await searchBooksQuery(query);
      setSearchResults(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <section>
        <SearchBar />
      </section>

      <h1 className="text-xl font-medium text-midnight text-center">
        Search Results for `{query}`
      </h1>
      <section className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-2 gap-y-4">
        {isLoading ? (
          <div className="col-span-full flex justify-center items-center min-h-[60vh]">
            <BookLoader />
          </div>
        ) : (
          searchResults.map((book) => {
            const author =
              book.author_name?.[0] ??
              book.authors?.[0]?.name ??
              "Unknown Author";
            return (
              <BookCard
                key={book.key}
                coverId={book.cover_i}
                title={book.title}
                author={author}
                to={`/discover/${book.key.split("/")[2]}`}
                state={{ from: location.pathname + location.search }}
              />
            );
          })
        )}
      </section>
    </div>
  );
}

export default SearchResultsPage;
