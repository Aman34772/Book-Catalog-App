import { toast } from "react-hot-toast";
import emptyCart from "../assets/images/empty_cart.svg";
import { removeFromWishlist } from "../redux/features/books/wishlistSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { IBook } from "../types/globalTypes";

const WishList = () => {
  // Redux Selector and Dispatch method
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist);

  // handle remove from wishlist button
  const handleRemoveFromWishlist = (book: IBook) => {
    dispatch(removeFromWishlist(book));

    // show success toast
    toast.success("Book deleted from wishlist");
  };

  return (
    <section>
      {wishlist?.books?.length > 0 ? (
        <div className="md:mx-60 lg:mx-80 my-24 bg-lime-50 p-6 rounded-xl">
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold">Your Wishlist</h1>
            <p className="text-md">
              Total added Book: ({wishlist?.books?.length})
            </p>
          </div>

          {wishlist?.books?.map((book) => (
            <div
              className="bg-white rounded-md p-3 mb-2 flex justify-between"
              key={book._id}
            >
              <div className="flex gap-2">
                <img src={book.coverImage} alt="cover" className="w-16" />
                <div>
                  <h1 className="text-sm font-semibold">{book.title}</h1>
                  <p className="text-sm text-[#16A571]">
                    Author: {book.author}
                  </p>
                  <p className="text-sm">Genre: {book.genre}</p>
                  <p className="text-sm">
                    Publication Year: {book.publicationDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div>
                  <button
                    onClick={() => handleRemoveFromWishlist(book)}
                    className="px-2.5 py-2.5 text-red-600 duration-150 bg-red-50 rounded-lg hover:bg-red-100 active:bg-red-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 5a2 2 0 012-2h14a2 2 0 012 2v2H3V5zm15 4a1 1 0 00-1 1v9a1 1 0 01-1 1H8a1 1 0 01-1-1V10a1 1 0 00-2 0v9a3 3 0 003 3h8a3 3 0 003-3V10a1 1 0 00-1-1zm-8-1a1 1 0 011 1v7a1 1 0 01-2 0V9a1 1 0 011-1zm4 0a1 1 0 011 1v7a1 1 0 01-2 0V9a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center py-32">
          <img src={emptyCart} alt="empty cart" className="w-1/3" />
          <h1 className="text-2xl font-semibold mt-8">
            Your wishlist is empty!
          </h1>
        </div>
      )}
    </section>
  );
};

export default WishList;
