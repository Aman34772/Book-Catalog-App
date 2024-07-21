import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import Loader from "../components/Loader";
import { useGetBooksQuery } from "../redux/features/books/bookApi";
import {
  setSearchQuery,
  setSelectedGenre,
  setSelectedPublicationYear,
} from "../redux/features/books/bookSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { IBook } from "../types/globalTypes";

const AllBooks = () => {
  // redux
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useGetBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // Redux state
  const searchQuery = useAppSelector((state) => state.book.searchQuery);
  const selectedGenre = useAppSelector((state) => state.book.selectedGenre);
  const selectedPublicationYear = useAppSelector(
    (state) => state.book.selectedPublicationYear
  );

  // Handle search input change
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  // Handle genre filter change
  const handleGenreFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedGenre(e.target.value));
  };

  // Handle publication year filter change
  const handlePublicationYearFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setSelectedPublicationYear(e.target.value));
  };

  // Filter and render books
  const filteredBooks = data?.data
    .filter((book: IBook) => {
      const titleMatch = book.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const authorMatch = book.author
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const genreMatch = book.genre
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return titleMatch || authorMatch || genreMatch;
    })
    .filter((book: IBook) => !selectedGenre || book.genre === selectedGenre)
    .filter(
      (book: IBook) =>
        !selectedPublicationYear ||
        book.publicationDate === selectedPublicationYear
    );

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    console.log(isError);
  }

  // Determine whether to display all books or filtered books
  const displayBooks =
    searchQuery || selectedGenre || selectedPublicationYear
      ? filteredBooks
      : data?.data;

  return (
    <section className="px-8 md:px-16 lg:px-24 py-24 bg-lime-50">
      <div>
        {/* search bar */}
        <form className="">
          <h2 className="text-xl font-semibold text-center mb-2">
            Search for Books
          </h2>
          <div className="relative">
            <input
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Search by title, author, or genre"
              type="text"
              className="w-full rounded-md border-gray-200 outline-0 py-4 px-4 shadow-sm sm:text-sm"
            />

            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
              <button className="text-gray-600 hover:text-gray-700">
                <span className="sr-only">Search</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </span>
          </div>
        </form>

        {/* filter */}
        <div className="flex justify-between mt-4 flex-col lg:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">
                Filter by Genre
              </label>
              <select
                value={selectedGenre}
                onChange={handleGenreFilterChange}
                name=""
                id=""
                className="px-2 py-3 text-gray-500 bg-white outline-none"
              >
                <option value="">Select genre</option>
                {[
                  ...(new Set<string>(
                    data?.data?.map(
                      (book: { _id: number; genre: string }) => book?.genre
                    )
                  ) || []),
                ].map((uniqueGenre, index) => (
                  <option key={index} value={uniqueGenre}>
                    {uniqueGenre}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">
                Filter by Publication Year
              </label>
              <select
                value={selectedPublicationYear}
                onChange={handlePublicationYearFilterChange}
                className="px-2 py-3 text-gray-500 bg-white outline-none"
              >
                <option value="">Select year</option>
                {[
                  ...(new Set<string>(
                    data?.data?.map(
                      (book: { _id: number; publicationDate: string }) =>
                        book?.publicationDate
                    )
                  ) || []),
                ].map((uniquePublicationYear, index) => (
                  <option key={index} value={uniquePublicationYear}>
                    {uniquePublicationYear}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* add new book */}
          <div>
            <Link
              to="/add-new-book"
              className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-slate-950 rounded-lg duration-150 hover:bg-slate-800 active:bg-slate-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2a1 1 0 011 1v8h8a1 1 0 110 2h-8v8a1 1 0 11-2 0v-8H3a1 1 0 010-2h8V3a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add new Book
            </Link>
          </div>
        </div>

        {/* all books here */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 py-12">
          {displayBooks?.map((book: IBook) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllBooks;
