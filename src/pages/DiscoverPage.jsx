import { useState, useEffect } from "react";
import { getBooksByGenre } from "@/services/api";
import BookCarousel from "@/components/BookCarousel";
import {
  WandSparkles,
  Rocket,
  Heart,
  HatGlasses,
  Ghost,
  Landmark,
} from "lucide-react";
import GenreCard from "@/components/GenreCard";
import SearchBar from "@/components/SearchBar";

function DiscoverPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("fantasy");
  const [genreBooks, setGenreBooks] = useState([]);

  useEffect(() => {
    getData();
  }, [selectedGenre]);

  const getData = async () => {
    setIsLoading(true);
    try {
      const bookResponse = await getBooksByGenre(selectedGenre);
      setGenreBooks(bookResponse);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("Genre books state: ", genreBooks);
  console.log("Current selected genre: ", selectedGenre);

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
          <GenreCard
            name="Fantasy"
            Icon={WandSparkles}
            onClick={() => setSelectedGenre("fantasy")}
            isSelected={selectedGenre === "fantasy"}
          />
          <GenreCard
            name="Sci-Fi"
            Icon={Rocket}
            onClick={() => setSelectedGenre("science_fiction")}
            isSelected={selectedGenre === "science_fiction"}
          />
          <GenreCard
            name="Romance"
            Icon={WandSparkles}
            onClick={() => setSelectedGenre("romance")}
            isSelected={selectedGenre === "romance"}
          />
          <GenreCard
            name="Mystery"
            Icon={Heart}
            onClick={() => setSelectedGenre("mystery")}
            isSelected={selectedGenre === "mystery"}
          />
          <GenreCard
            name="Horror"
            Icon={Ghost}
            onClick={() => setSelectedGenre("horror")}
            isSelected={selectedGenre === "horror"}
          />
          <GenreCard
            name="Historical"
            Icon={Landmark}
            onClick={() => setSelectedGenre("history")}
            isSelected={selectedGenre === "history"}
          />
        </div>
      </section>
      <hr />
      <section>
        {isLoading ? (
          <p>Loading books...</p>
        ) : (
          <BookCarousel books={genreBooks} />
        )}
      </section>
    </main>
  );
}

export default DiscoverPage;
