import { getSavedBooks } from "@/services/api";
import BookLoader from "@/components/BookLoader";
import useFetchBooks from "@/hooks/useFetchBooks";
import { LibraryBig, Vault } from "lucide-react";
import { useState } from "react";
import { filters } from "@/data/filters";
import ButtonFilterCard from "@/components/ButtonFilterCard";
import BookCard from "@/components/BookCard";

function BookshelfPage() {
  const { data: shelfBooks, isLoading, error } = useFetchBooks(getSavedBooks);
  const [selectedFilter, setSelectedFilter] = useState("all books");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <BookLoader />
      </div>
    );
  }

  if (error || !shelfBooks) {
    return (
      <h2>
        An error has occurred. The data could not be loaded. Please try again
        later.
      </h2>
    );
  }

  if (shelfBooks.length === 0) {
    return (
      <h2>
        Your vault appears to be empty. Discover some books to start your
        collection.
      </h2>
    );
  }

  const filteredBooks =
    selectedFilter !== "all books"
      ? shelfBooks.filter(
          (book) => book.status.toLowerCase() === selectedFilter,
        )
      : shelfBooks;

  return (
    <main className="max-w-6xl mx-auto px-2 py-4">
      <section className="bg-[#1D3151] rounded-xl px-4 py-4 md:py-10 text-center">
        <Vault className="mx-auto mb-3 text-[#EAC77B]" size={36} />
        <h1 className="text-3xl md:text-4xl font-semibold text-[#EAC77B]">
          My Vault
        </h1>
        <p className="text-[#FFF4E4] text-sm md:text-base mt-3">
          A sanctuary for stories, adventures, and worlds beyond imagination.
        </p>
      </section>

      <section className="mt-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-[#1D3151]">
              <LibraryBig />
            </span>
            <h2 className="text-xl font-semibold text-[#1D3151]">
              My Collection
            </h2>
          </div>
          <div>
            <span className="text-sm text-[#247F80]">
              {shelfBooks.length} books
            </span>
          </div>
        </div>
        <hr className="my-4 border-[#D7C6AC]" />
        <div className="flex flex-wrap justify-center gap-2">
          {filters.map((filter) => {
            return (
              <ButtonFilterCard
                key={filter.name}
                name={filter.name}
                isSelected={selectedFilter === filter.value}
                onClick={() => setSelectedFilter(filter.value)}
              />
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-x-2 md:gap-x-4 gap-y-10 mt-10">
        {filteredBooks.map((book) => {
          return (
            <BookCard
              key={book.id}
              coverId={book.coverId}
              title={book.title}
              author={book.author}
              to={`/bookshelf/${book.id}`}
            />
          );
        })}
      </section>
    </main>
  );
}

export default BookshelfPage;
