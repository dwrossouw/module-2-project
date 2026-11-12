import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function RatingSystem({ value, onChange, readOnly = false, size = "medium" }) {
  return (
    <Rating
      max={10}
      precision={0.5}
      icon={<FavoriteIcon />}
      emptyIcon={<FavoriteBorderIcon />}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      size={size}
      sx={{
        "& .MuiRating-iconFilled": {
          color: "#E38B70",
        },
        "& .MuiRating-iconEmpty": {
          color: "#D7C6AC",
        },
        "& .MuiRating-iconHover": {
          color: "#D96F61",
        },
      }}
    />
  );
}

export default RatingSystem;
