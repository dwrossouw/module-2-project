function BookCard(props) {
  return (
    <div className="book-3d !w-32">
      <img
        src={`https://covers.openlibrary.org/b/id/${props.cover_Id}-M.jpg`}
        alt="Cover image"
        className="w-12  aspect-[7/10] object-cover rounded-lg mx-auto"
      />
    </div>
  );
}

export default BookCard;
