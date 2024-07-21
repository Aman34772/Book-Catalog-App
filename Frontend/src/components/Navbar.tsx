import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase.init";
import { setUser } from "../redux/features/auth/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";

const Navbar = () => {
  // declare state for handling navigation bar
  const [state, setState] = useState(false);

  // Redux dispatch and selector
  const { user } = useAppSelector((state) => state.user);
  const wishlist = useAppSelector((state) => state.wishlist);
  const dispatch = useAppDispatch();

  // handle SignOut button
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(setUser(null));
    });
  };

  // get current User from firebase
  const currentUser = getAuth().currentUser;
  const photoURL = currentUser?.photoURL;

  return (
    <nav className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-10 text-sm">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link to="/">
            <h1 className="text-2xl font-bold text-black">Book Store.</h1>
          </Link>
          <div className="md:hidden">
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            <li className="text-gray-700 hover:text-[#16a571]">
              <Link to="all-books" className="block">
                All Books
              </Link>
            </li>
            <li className="text-gray-700 hover:text-[#16a571]">
              <Link to="wishlist" className="block">
                My Favourites {/* wishlist count badge */}
                {wishlist?.books?.length > 0 && (
                  <span className="bg-[#16a571] text-white rounded-full py-1 px-2 text-xs">
                    {wishlist?.books?.length}
                  </span>
                )}
              </Link>
            </li>
            <span className="hidden w-px h-6 bg-gray-300 md:block"></span>
            {user?.email && (
              <li className="text-gray-700 hover:text-[#16a571]">
                <Link to="add-new-book" className="block">
                  Add Book
                </Link>
              </li>
            )}
            <div className="space-y-3 items-center gap-x-6 md:flex md:space-y-0">
              {user?.email ? (
                <div>
                  <div className="flex items-center relative group gap-x-3">
                    <img
                      src={
                        photoURL ||
                        "https://media.istockphoto.com/id/1008484130/vector/creative-vector-illustration-of-default-avatar-profile-placeholder-isolated-on-background.jpg?s=612x612&w=0&k=20&c=H57e2HUi6qDyPoBl8Om1dlX22--BqgGp64cFKsywWZ0="
                      }
                      className="w-10 h-10 rounded-full"
                      alt="User Profile"
                    />
                    <div>
                      <span className="block text-gray-700 text-sm font-medium">
                        {getAuth().currentUser?.displayName}
                      </span>
                      <span className="block text-gray-700 text-xs">
                        {getAuth().currentUser?.email}
                      </span>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="px-2.5 py-2.5 text-red-600 duration-150 bg-red-50 rounded-lg hover:bg-red-100 active:bg-red-200"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <li>
                    <Link
                      to="login"
                      className="block py-3 text-center text-gray-700 hover:text-[#16a571] border rounded-lg md:border-none"
                    >
                      Log in
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="signup"
                      className="block py-3 px-4 font-medium text-center text-white bg-[#16a571] hover:bg-green-600 active:bg-bg-green-700 active:shadow-none rounded-lg shadow md:inline"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
