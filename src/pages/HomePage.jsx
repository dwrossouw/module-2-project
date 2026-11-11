import { Link } from "react-router-dom";
import BookCarousel from "../components/BookCarousel";
import { getTrendingBooks } from "../services/api";
import SearchBar from "@/components/SearchBar";
import BookLoader from "@/components/BookLoader";
import useFetchBooks from "../hooks/useFetchBooks";

function HomePage() {
  const {
    data: trendingBooks,
    isLoading,
    error,
  } = useFetchBooks(getTrendingBooks);

  console.log("Trending books: ", trendingBooks);

  return (
    <main className="homeContainer">
      {/* Hero Section */}
      <section className="flex flex-col items-center gap-4 pt-2 pb-8 px-4">
        <img
          src="/src/assets/logo.png"
          alt="Vault of Tomes logo"
          className="w-70 max-w-full md:w-90 lg:w-110 h-auto p-0 m-0"
        />
        <h1 className="text-2xl font-bold text-midnight text-center">
          Every book holds a world. Find yours.
        </h1>
        <p className="text-center text-enchanted-teal max-w-xl">
          Discover stories, explore new worlds, and build your personal vault.
        </p>
        <SearchBar />
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
          {isLoading ? (
            <div className="flex justify-center items-center min-h-48">
              <BookLoader />
            </div>
          ) : (
            <BookCarousel books={trendingBooks} />
          )}
        </div>
      </section>

      {/* Book Quiz */}
      <section className="ml-5">
         <h2 className="text-2xl text-midnight font-semibold">
            Book quiz
          </h2>
        <p></p>
        <span>Coming soon...</span>
      </section>
    </main>
  );
}

export default HomePage;
