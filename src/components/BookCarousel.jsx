import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";

function BookCarousel({ books }) {
  return (
    <div>
      <Carousel
        className="w-full max-w-4xl mx-auto"
        opts={{ loop: true, align: "start" }}
      >
        <CarouselContent className="-ml-1">
          {books.map((book) => {
            return (
              <CarouselItem
                key={book.key}
                className="pl-1 basis-1/3 md:basis-1/3 lg:basis-1/5"
              >
                <Link to={`/discover/${book.key.split("/")[2]}`}>
                  <div className="book-3d">
                    <img
                      src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                      alt={book.title}
                      className="w-full  aspect-[7/10] object-cover rounded-lg mx-auto"
                    />
                  </div>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-2 z-10" />
        <CarouselNext className="right-2 z-10" />
      </Carousel>
    </div>
  );
}

export default BookCarousel;
