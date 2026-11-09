import { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "@/components/BookCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";

function DiscoverPage() {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_OPEN_LIBRARY_URL}/subjects/fantasy.json?limit=10`);
      console.log(response);
      setFeaturedBooks(response.data.works);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
 
  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  console.log(featuredBooks);
  return (
    <main>
      <h1 className="text-2xl text-center">Discover Books</h1>
      <p className="text-center">Find your next great read.</p>
      <section className="flex flex-wrap">
        {featuredBooks.map((book)=>{
          return (
          <Link to={`/discover/${book.key.split("/")[2]}`} key={book.key}><BookCard cover_Id={book.cover_id}/></Link>  
          )
        })}
        
      </section>
      <section></section>
      <section></section>
    </main>
  );
}

export default DiscoverPage;
