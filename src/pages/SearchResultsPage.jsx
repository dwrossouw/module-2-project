import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchBooksQuery } from "@/services/api";
import { Link } from "react-router-dom";

function SearchResultsPage() {

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');


  useEffect (()=>{
    getData();
  },[query])

  const getData = async ()=>{
    setIsLoading(true);
    try{
      const response = await searchBooksQuery (query);
      setSearchResults (response);
    }
    catch(error){
      console.log(error);
    }
    finally{
      setIsLoading(false);
    }
  }
  console.log(query);
  console.log("Search results: ", searchResults);
  return (
    <div>
      <h1 className="text-xl font-medium text-midnight text-center">
        Search Results for `{query}`
      </h1>
      <section className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-2 gap-y-4">
        {searchResults.map((book)=>{
          return (
            <div key={book.key}>
              <Link to={`/discover/${book.key.split("/")[2]}`}>
                  <div className="book-3d">
                    <img
                      src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                      alt={book.title}
                      className="w-12  aspect-[7/10] object-cover rounded-lg mx-auto"
                    />
                  </div>
                </Link>
                <p className="text-sm font-medium text-midnight text-center line-clamp-2 mt-2">{book.title}</p>
                <p className="text-xs text-gray-500 text-center truncate">{book.author_name}</p>
            </div>
          )
        })}
      </section>
    </div>
  );
}

export default SearchResultsPage;
