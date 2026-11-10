export const extractGenres = (subjects) => {
  const genres = [
    "Fantasy",
    "Science Fiction",
    "Romance",
    "Mystery",
    "Thriller",
    "Horror",
    "Historical Fiction",
    "Adventure",
    "Literary Fiction",
    "Contemporary Fiction",
    "Classics",
    "Young Adult",
    "Children's Fiction",
    "Dystopian",
    "Biography",
    "Autobiography",
    "Memoir",
    "History",
    "Self-Help",
    "Nonfiction",
  ];

  const result = genres.filter((genre) =>
    subjects.some((subject) =>
      subject.toLowerCase().includes(genre.toLowerCase()),
    ),
  );

  return result.slice(0,3);
};
