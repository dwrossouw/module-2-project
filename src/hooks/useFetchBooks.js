import { useState, useEffect } from "react";

function useFetchBooks(fetchFunction, parameter) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;

    const getData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchFunction(parameter);
        isActive && setData(response);
      } catch (error) {
        isActive && setError(error);
      } finally {
        isActive && setIsLoading(false);
      }
    };
    getData();
    return () => {
      isActive = false;
    };
  }, [fetchFunction, parameter]);

  return { data, isLoading, error };
}

export default useFetchBooks;
