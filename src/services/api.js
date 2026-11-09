import axios from "axios";

export const getTrendingBooks = async() =>  {
      const response = await axios.get(
        `${import.meta.env.VITE_OPEN_LIBRARY_URL}/trending/daily.json?limit=20`,
      );

      return response.data.works;
}

export const getSavedBooks = async ()=> {
  const response = await axios.get(
        `${import.meta.env.VITE_JSON_SERVER_URL}/books`,
      );

      return response.data;
}
