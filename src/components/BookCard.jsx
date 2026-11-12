import { Link } from "react-router-dom";

function BookCard({ coverId, title, author, to }) {
  return (
    <div>
      <div className="book-3d aspect-[7/10]">
        <Link to={to}>
          <img
            src={`https://covers.openlibrary.org/b/id/${coverId}-M.jpg`}
            alt="Cover image"
            className="w-full h-full object-cover min-w-0"
          />
        </Link>
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-sm font-semibold text-[#1D3151] text-center line-clamp-2 leading-snug min-h-5">
          {title}
        </p>
        <p className="text-xs text-gray-500 text-center">{author}</p>
      </div>
    </div>
  );
}

export default BookCard;
