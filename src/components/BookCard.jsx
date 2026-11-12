import { Link } from "react-router-dom";
import coverImg from "../assets/default-cover.png";

function BookCard({ coverId, title, author, to, state }) {
  return (
    <div>
      <div className="book-3d aspect-[7/10]">
        <Link to={to} state={state}>
        <BookCard coverId={coverId} title={title} />
          {/* <img
            src={
              coverId
                ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg?default=false`
                : coverImg
            }
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = coverImg;
            }}
            alt={`Cover of ${title}`}
            className="w-full h-full object-cover min-w-0"
          /> */}
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
