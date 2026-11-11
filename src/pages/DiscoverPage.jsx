import { useState, useEffect } from "react";
import { getBooksByGenre, getTrendingBooks } from "@/services/api";
import BookCarousel from "@/components/BookCarousel";
import GenreCard from "@/components/GenreCard";
import SearchBar from "@/components/SearchBar";
import BookLoader from "@/components/BookLoader";
import { genres } from "@/data/genres";
import useFetchBooks from "@/hooks/useFetchBooks";

function DiscoverPage() {
  const [selectedGenre, setSelectedGenre] = useState("fantasy");

  const {
    data: genreBooks,
    isLoading: isGenreLoading,
    error: genreError,
  } = useFetchBooks(getBooksByGenre, selectedGenre);
  const {
    data: trendingBooks,
    isLoading: isTrendingLoading,
    error: trendingError,
  } = useFetchBooks(getTrendingBooks, "weekly");
  const {
    data: classicBooks,
    isLoading: isClassicLoading,
    error: classicError,
  } = useFetchBooks(getBooksByGenre, "classics");

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
              <GenreCard
                key={genre.value}
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
        {isGenreLoading ? (
          <div className="flex justify-center items-center min-h-48">
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
        {isTrendingLoading ? (
          <div className="flex justify-center items-center min-h-48">
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
        {isClassicLoading ? (
          <div className="flex justify-center items-center min-h-48">
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
