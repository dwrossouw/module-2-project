import { useState, useEffect } from "react";
import { getBooksByGenre } from "@/services/api";
import BookCarousel from "@/components/BookCarousel";
import {
  Search,
  WandSparkles,
  Rocket,
  Heart,
  HatGlasses,
  Ghost,
  Landmark,
} from "lucide-react";
import GenreCard from "@/components/GenreCard";

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

  const handleSelectedGenre = () => {};

  // if (isLoading) {
  //   return <h3>Loading...</h3>;
  // }

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
        <form className="flex max-w-xl w-full gap-2">
          <input
            type="search"
            name="search"
            placeholder="Search books or authors..."
            className="flex-1 min-w-0 bg-white rounded-lg border border-gray-300 px-4 py-2"
          />
          <button
            type="submit"
            className="bg-enchanted-teal text-ivory px-6 py-2 rounded-lg hover:bg-midnight cursor-pointer"
          >
            <Search size={20} />
          </button>
        </form>
      </section>
      <section>
        <h2>Explore by genre</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          <GenreCard
            name="Fantasy"
            Icon={WandSparkles}
            onClick={() => setSelectedGenre("fantasy")}
            isSelected = {selectedGenre === "fantasy"}
          />
          <GenreCard
            name="Sci-Fi"
            Icon={Rocket}
            onClick={() => setSelectedGenre("science_fiction")}
            isSelected = {selectedGenre === "science_fiction"}
          />
          <GenreCard
            name="Romance"
            Icon={WandSparkles}
            onClick={() => setSelectedGenre("romance")}
            isSelected = {selectedGenre === "romance"}
          />
          <GenreCard
            name="Mystery"
            Icon={Heart}
            onClick={() => setSelectedGenre("mystery")}
            isSelected = {selectedGenre === "mystery"}
          />
          <GenreCard
            name="Horror"
            Icon={Ghost}
            onClick={() => setSelectedGenre("horror")}
            isSelected = {selectedGenre === "horror"}
          />
          <GenreCard
            name="Historical"
            Icon={Landmark}
            onClick={() => setSelectedGenre("history")}
            isSelected = {selectedGenre === "history"}
          />
        </div>
      </section>
      <section>
        <h2 className="text-xl text-center font semi-bold text-midnight mb-4">
          {selectedGenre} Books
        </h2>
        {isLoading ? (
          <p>Loading books...</p>
        ) : (
          <BookCarousel books={genreBooks} />
        )}
      </section>
      <hr />
    </main>
  );
}

export default DiscoverPage;

// const response = await axios.get(
//   `${import.meta.env.VITE_OPEN_LIBRARY_URL}/subjects/fantasy.json?limit=10`);
// console.log(response);
// setFeaturedBooks(response.data.works);

//  <section className="flex flex-wrap">
//         {featuredBooks.map((book)=>{
//           return (
//           <Link to={`/discover/${book.key.split("/")[2]}`} key={book.key}><BookCard cover_Id={book.cover_id}/></Link>
//           )
//         })}
//       </section>

{
  /* <button type="button" name="fantasy"className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl cursor-pointer bg-[#EDE5F5] text-[#70538C] hover:bg-[#DDD0EB] transition-colors">
            <WandSparkles />
            <span>Fantasy</span>
          </button> */
}
