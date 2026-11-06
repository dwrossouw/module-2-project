import { useState, useEffect } from "react";
import axios from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function TrendingCarousel() {
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_OPEN_LIBRARY_URL}/trending/daily.json?limit=20`,
      );
      console.log(response);
      setTrendingBooks(response.data.works);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(trendingBooks);
  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselContent className="-ml-2">
          {trendingBooks.map((book) => {
            return (
              <CarouselItem key={book.key} className="pl-2 basis-1/2 md:basis-1/3 lg:basis-1/5">
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.title}
                  className="w-full  aspect-[7/10] object-cover rounded-lg mx-auto"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-2 z-10"/>
        <CarouselNext className="right-2 z-10"/>
      </Carousel>
    </div>
  );
}

export default TrendingCarousel;

{
  /* <div className="flex gap-4">
    {trendingBooks.map((book)=>{
      return <img key={book.key} src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt="" className="w-28 h-40 object-cover rounded-lg" />
    })}
    </div>; */
}
