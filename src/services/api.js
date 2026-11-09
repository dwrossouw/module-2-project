import axios from "axios";

export const getTrendingBooks = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_OPEN_LIBRARY_URL}/trending/daily.json?limit=20`,
  );

  return response.data.works;
};

export const getSavedBooks = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_JSON_SERVER_URL}/books`,
  );

  return response.data;
};

export const getBookDetails = async (bookId) => {
  const response = await axios.get(
    `${import.meta.env.VITE_JSON_SERVER_URL}/books/${bookId}`,
  );

  return response.data;
};

export const getReviewDetails = async (bookId) => {
  const response = await axios.get(
    `${import.meta.env.VITE_JSON_SERVER_URL}/reviews?bookId=${bookId}`,
  );

  return response.data[0];
};

export const updateStatus = async (bookId, status) => {
  await axios.patch(`${import.meta.env.VITE_JSON_SERVER_URL}/books/${bookId}`, {
    status: status,
  });
};

export const updateReview = async (reviewId, rating, comment) => {
  await axios.patch(
    `${import.meta.env.VITE_JSON_SERVER_URL}/reviews/${reviewId}`,
    { rating: rating, comment: comment },
  );
};

export const addReview = async (bookId, rating, comment) => {
  await axios.post(`${import.meta.env.VITE_JSON_SERVER_URL}/reviews`, {
    bookId: bookId,
    rating: rating,
    comment: comment
  });
};

export const deleteBook = async (bookId)=> {
  await axios.delete(
        `${import.meta.env.VITE_JSON_SERVER_URL}/books/${bookId}`,
      );
}
