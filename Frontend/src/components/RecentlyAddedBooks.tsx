import { useGetBooksQuery } from "../redux/features/books/bookApi";
import { IBook } from "../types/globalTypes";
import BookCard from "./BookCard";
import Loader from "./Loader";

const RecentlyAddedBooks = () => {
  // fetching data by RTK Query
  const { data, isLoading, isError } = useGetBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // is loading...
  if (isLoading) {
    return <Loader />;
  }
  // is error
  if (isError) {
    console.log(isError);
  }

  return (
    <section className="px-8 md:log-16 lg:px-20 py-20 bg-lime-50">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">
          Recently <span className="text-[#16A571]">Added Book</span>
        </h1>
        <p className="text-md mt-2">
          Dive into a World of Fresh Literary Adventures and Explore the Latest
          Releases and Hidden Gems.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-8 py-12">
        {data?.data
          .map((book: IBook) => <BookCard key={book._id} book={book} />)
          .reverse()
          .slice(0, 10)}
      </div>
    </section>
  );
};

export default RecentlyAddedBooks;
