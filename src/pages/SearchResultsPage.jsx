import { useSearchParams } from "react-router-dom";

function SearchResultsPage() {

  const [searchParams] = useSearchParams();

  const query = searchParams.get('q');

  console.log(query);
  return (
    <div>
      <h1 className="text-xl font-medium text-midnight text-center">
        Search Results for `{query}`
      </h1>
    </div>
  );
}

export default SearchResultsPage;
