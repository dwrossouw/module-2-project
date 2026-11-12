import coverImg from "../assets/default-cover.png";
function BookCover({coverId,title, size="M", className= "w-full h-full object-cover min-w-0"}) {
  return (
    <img
                src={
                  coverId
                    ? `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg?default=false`
                    : coverImg
                }
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = coverImg;
                }}
                alt={`Cover of ${title}`}
                className={className}
              />
  )
}

export default BookCover