import { Search } from "lucide-react";

function SearchBar() {
  return (
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
  )
}

export default SearchBar