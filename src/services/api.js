import axios from "axios";

//OpenLibrary API functions
export const getTrendingBooks = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_OPEN_LIBRARY_URL}/trending/daily.json?limit=20`,
  );

  return response.data.works;
};

export const getDiscoverBookDetails = async (workId) => {
  const response = await axios.get(
    `${import.meta.env.VITE_OPEN_LIBRARY_URL}/works/${workId}.json`,
  );
  return response.data;
};

export const getAuthorDetails = async (authorKey) => {
  const response = await axios.get (`${import.meta.env.VITE_OPEN_LIBRARY_URL}${authorKey}.json`)
  return response.data.name;
}

export const getBooksByGenre = async (genre) => {
  const response = await axios.get(
    `${import.meta.env.VITE_OPEN_LIBRARY_URL}/subjects/${genre}.json?limit=50`,
  );
  return response.data.works;
}

export const searchBooksQuery = async (query) => {
  const response = await axios.get(
    `${import.meta.env.VITE_OPEN_LIBRARY_URL}/search.json?q=${encodeURIComponent(query)}`,
  );
  return response.data.docs;
}

// JSON Server functions
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
    comment: comment,
  });
};

export const deleteBook = async (bookId) => {
  await axios.delete(`${import.meta.env.VITE_JSON_SERVER_URL}/books/${bookId}`);
};

export const addBook = async (book) => {
  await axios.post (`${import.meta.env.VITE_JSON_SERVER_URL}/books`, book);
}

export const deleteReview = async (reviewId) =>{
  await axios.delete(`${import.meta.env.VITE_JSON_SERVER_URL}/reviews/${reviewId}`);
}
