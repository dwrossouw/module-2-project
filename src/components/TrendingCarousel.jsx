import { useState, useEffect } from "react";
import axios from "axios";

function TrendingCarousel() {
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_OPEN_LIBRARY_URL}/trending/daily.json?limit=5`,
      );
      console.log(response);
      setTrendingBooks(response.data.works);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
    finally {
      setIsLoading(false);
    }
  };
  console.log(trendingBooks);
  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  
  return <div className="flex gap-4">
    {trendingBooks.map((book)=>{
      return <img key={book.key} src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt="" className="w-28 h-40 object-cover rounded-lg" />
    })}
    </div>;
}

export default TrendingCarousel;
