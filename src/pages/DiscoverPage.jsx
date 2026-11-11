import { useState, useEffect } from "react";
import { getBooksByGenre, getTrendingBooks } from "@/services/api";
import BookCarousel from "@/components/BookCarousel";
import GenreCard from "@/components/GenreCard";
import SearchBar from "@/components/SearchBar";
import BookLoader from "@/components/BookLoader";
import { genres } from "@/data/genres";

function DiscoverPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("fantasy");
  const [genreBooks, setGenreBooks] = useState([]);
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [classicBooks, setClassicBooks] = useState([]);

  useEffect(() => {
    getData();
  }, [selectedGenre]);

  const getData = async () => {
    setIsLoading(true);
    try {
      const bookResponse = await getBooksByGenre(selectedGenre);
      setGenreBooks(bookResponse);
      const trendingResponse = await getTrendingBooks ("weekly");
      setTrendingBooks (trendingResponse);
      const classicResponse = await getBooksByGenre("classics");
      setClassicBooks (classicResponse);

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("Genre books state: ", genreBooks);
  console.log("Current selected genre: ", selectedGenre);
  console.log("Trending weekly: ", trendingBooks);
  console.log("Classics: ", classicBooks);

  return (
    <main className="max-w-6xl mx-auto px-4 py-4 space-y-2">
      <h1 className="text-2xl text-center font-semibold text-midnight">
        Discover Books
      </h1>
      <p className="text-center">Find your next great read.</p>
      <hr />
      <section>
        <SearchBar />
      </section>
      <section>
        <h2 className="text-xl text-center font semi-bold text-midnight mb-4">
          Explore by genre
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {genres.map((genre) => {
            return (
              <GenreCard key={genre.value}
                name={genre.name}
                Icon={genre.Icon}
                onClick={() => setSelectedGenre(genre.value)}
                isSelected={selectedGenre === genre.value}
              />
            );
          })}
       
        </div>
      </section>
      <hr />
      <section>
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <BookLoader />
          </div>
        ) : (
          <BookCarousel books={genreBooks} />
        )}
      </section>
      <hr />
      <section>
        <h2 className="text-xl text-center font semi-bold text-midnight mb-4">
          Trending weekly
        </h2>
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <BookLoader />
          </div>
        ) : (
          <BookCarousel books={trendingBooks} />
        )}
      </section>
      <hr />
      <section>
        <h2 className="text-xl text-center font semi-bold text-midnight mb-4">
          Timeless Classics
        </h2>
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <BookLoader />
          </div>
        ) : (
          <BookCarousel books={classicBooks} />
        )}
      </section>
    </main>
  );
}

export default DiscoverPage;
