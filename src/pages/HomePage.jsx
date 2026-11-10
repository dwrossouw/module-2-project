import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import BookCarousel from "../components/BookCarousel";
import { getTrendingBooks } from "../services/api";
import { useState, useEffect } from "react";

function HomePage() {
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getTrendingBooks();
      setTrendingBooks(response);
      
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log("Trending books: ", trendingBooks);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <main className="homeContainer">
      {/* Hero Section */}
      <section className="flex flex-col items-center gap-4 py-8 px-4">
        <h1 className="text-3xl font-bold text-midnight text-center">
          Your next great read awaits.
        </h1>
        <p className="text-center text-enchanted-teal max-w-xl">
          Discover stories, explore new worlds, and build your personal
          bookshelf.
        </p>
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
        <Link
          to="/discover"
          className="bg-midnight text-ivory rounded-lg px-6 py-2 hover:bg-enchanted-teal transition-colors"
        >
          Explore Books
        </Link>
      </section>

      {/* Trending Books */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl text-midnight font-semibold">
            Trending Books
          </h2>
          <Link
            to="/discover"
            className="text-enchanted-teal font-medium hover:text-midnight"
          >
            View More →
          </Link>
        </div>

        <div>
          <BookCarousel books={trendingBooks}/>
        </div>
      </section>

      {/* Book Quiz */}
      <section>
        <h2>Book quiz</h2>
        <p></p>
        <span>Coming soon...</span>
      </section>
    </main>
  );
}

export default HomePage;
