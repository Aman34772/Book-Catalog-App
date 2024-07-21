import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { addToWishlist } from "../redux/features/books/wishlistSlice";
import { useAppDispatch } from "../redux/hook";
import { IBook } from "../types/globalTypes";

// declare interface
interface IProps {
  book: IBook;
}

const BookCard = ({ book }: IProps) => {
  // handle dispatch
  const dispatch = useAppDispatch();

  // destructure book object
  const { _id, title, author, genre, publicationDate, coverImage } = book;

  // handle add to wishlist
  const handleAddToWishlist = () => {
    dispatch(addToWishlist(book));

    // show success toast
    toast.success("Book added to wishlist");
  };

  return (
    <div className="bg-white rounded-lg">
      <img src={coverImage} alt="cover" className="rounded-t-lg" />
      <div className="p-2 space-y-2">
        <Link to={`/book/${_id}`} className="text-center space-y-1">
          <h2 className="text-lg font-semibold hover:underline">{title}</h2>
          <h3 className="text-sm text-[#16A571]">{author}</h3>
          <p className="text-sm">{genre}</p>
          <p className="text-sm">{publicationDate}</p>
        </Link>
        <button
          onClick={() => handleAddToWishlist()}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-[#16a571] duration-150 bg-green-50 rounded-lg hover:bg-green-100 active:bg-green-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
              clipRule="evenodd"
            />
          </svg>
          Add to Favourites
        </button>
      </div>
    </div>
  );
};

export default BookCard;
