import { useState, useEffect } from "react";

function useFetchBooks(fetchFunction, parameter) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchFunction(parameter);
        setData(response);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [fetchFunction, parameter]);

  return { data, isLoading, error };
}

export default useFetchBooks;
