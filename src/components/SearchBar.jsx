import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams} from "react-router-dom";


function SearchBar() {
  
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [searchQuery, setSearchQuery] = useState(query??"");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      return;
    }
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex max-w-xl w-full gap-2 mx-auto">
        <input
          type="search"
          name="search"
          value={searchQuery}
          placeholder="Search books or authors..."
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 min-w-0 bg-white rounded-lg border border-gray-300 px-4 py-2"
        />
        <button
          type="submit"
          className="bg-enchanted-teal text-ivory px-6 py-2 rounded-lg hover:bg-midnight cursor-pointer"
        >
          <Search size={20} />
        </button>
    </form>
  );
}

export default SearchBar;
