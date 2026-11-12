import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BookCard from "./BookCard";

function BookCarousel({ books }) {
  
  return (
    <div>
      <Carousel
        className="w-full max-w-4xl mx-auto lg:max-w-6xl"
        opts={{ loop: true, align: "start" }}
      >
        <CarouselContent className="-ml-1">
          {books.map((book) => {
            const coverId = book.cover_i ?? book.cover_id;
            const author = book.author_name?.[0] ?? book.authors?.[0]?.name ?? "Unknown Author";
            return (
              <CarouselItem
                key={book.key}
                className="pl-1 basis-1/3 md:basis-1/4 lg:basis-1/6"
              >
                <BookCard coverId={coverId} title={book.title} author={author} to={`/discover/${book.key.split("/")[2]}`}/>
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
