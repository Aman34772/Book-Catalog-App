import { getAuth } from "firebase/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import {
  useDeleteBookMutation,
  useGetOneBookQuery,
  usePostBookReviewMutation,
} from "../redux/features/books/bookApi";
import { useAppSelector } from "../redux/hook";
import { IReview } from "../types/globalTypes";

const BookDetails = () => {
  // get book id from params
  const { id: bookId } = useParams();
  const navigate = useNavigate();

  // Define the form data structure
  type FormData = {
    rating: number;
    comment: string;
  };

  // get user from Redux state
  const { user } = useAppSelector((state) => state.user);

  // Create the form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  // redux
  const [postBookReview, { isLoading: postBookReviewLoading }] =
    usePostBookReviewMutation();

  // Define the onSubmit function with the correct type
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const commentData = {
      bookId: bookId,
      username: getAuth().currentUser?.displayName,
      image: getAuth().currentUser?.photoURL,
      comment: data?.comment,
      rating: data?.rating,
    };
    postBookReview(commentData);

    // Reset the form fields
    reset();

    // success toast
    toast.success("Your comment is posted successfully");
  };

  // fetching data by RTK Query
  const { data, isLoading, isError } = useGetOneBookQuery(bookId, {
    refetchOnMountOrArgChange: true,
  });

  const [deleteBook, { isSuccess }] = useDeleteBookMutation();

  console.log(isLoading, isError);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    console.log(isError);
  }

  // handle delete button
  const handleDeleteBtn = (bookId: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (isConfirmed) {
      deleteBook(bookId);

      // success toast
      toast.success("Book deleted successfully");
    }
  };

  // is Success return to book details page
  if (isSuccess) {
    navigate("/");
  }

  return (
    <section className="py-24 px-8 md:px-40 lg:px-52">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="flex items-center justify-center">
          <img
            alt="book"
            className="w-1/2 rounded"
            src={data?.data?.coverImage}
          />
        </div>

        <div>
          <h1 className="text-2xl font-semibold">{data?.data?.title}</h1>

          <div className="flex mb-4">
            <span className="flex items-center">
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-4 h-4 text-[#16a571]"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-4 h-4 text-[#16a571]"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-4 h-4 text-[#16a571]"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-4 h-4 text-[#16a571]"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-4 h-4 text-[#16a571]"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <span className="text-gray-600 ml-3">
                {data?.data?.reviews.length} Reviews
              </span>
            </span>
          </div>

          <div className="flex">
            <h2 className="text-sm ">Author: {data?.data?.author}</h2>
            <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s"></span>
            <h2 className="text-sm">Genre: {data?.data?.genre}</h2>
            <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s"></span>
            <h2 className="text-sm">
              Published Year: {data?.data?.publicationDate}
            </h2>
          </div>

          {/* hr line */}
          <div className="border-b-2 border-gray-100 my-5"></div>

          {/* Edit and Delete Book */}
          {user?.email === data?.data?.userEmail && (
            <div className="flex">
              <Link
                to={`/edit-book/${data?.data?._id}`}
                className="flex text-white bg-green-600 border-0 py-2 px-6 focus:outline-none hover:bg-green-700 rounded"
              >
                Edit Book
              </Link>
              <button
                onClick={() => handleDeleteBtn(data?.data?._id)}
                className="flex ml-4 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
              >
                {isLoading ? "Deleting..." : "Delete Book"}
              </button>
            </div>
          )}

          {/* add review */}
          {user?.email ? (
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <p className="text-md font-semibold mt-8">Add a Review</p>
                <select
                  className="mt-4 w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-green-600"
                  defaultValue=""
                  {...register("rating", { required: true })}
                >
                  <option disabled value="">
                    Select Rating
                  </option>
                  <option value={1}>1 out of 5</option>
                  <option value={2}>2 out of 5</option>
                  <option value={3}>3 out of 5</option>
                  <option value={4}>4 out of 5</option>
                  <option value={5}>5 out of 5</option>
                </select>
                {errors.rating && (
                  <span className="label-text-alt text-red-500 mt-2">
                    Rating is required
                  </span>
                )}
                <textarea
                  placeholder="Write comment"
                  rows={5}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-green-600 shadow-sm rounded-lg"
                  {...register("comment", { required: true })}
                />
                {errors.comment && (
                  <span className="label-text-alt text-red-500 mt-2">
                    Comment is required
                  </span>
                )}
                <button className="w-full mt-1 px-5 py-3 text-green-800 duration-150 bg-green-50 rounded-lg hover:bg-green-100 active:bg-green-200">
                  {postBookReviewLoading ? "Posting..." : "Leave Comment"}
                </button>
              </form>
            </div>
          ) : (
            <p>Please login and add your valuable review!</p>
          )}
        </div>
      </div>

      {/* review section */}
      <div className="w-full px-10">
        <h1 className="text-lg font-semibold mt-10 mb-8">
          Reviews and Ratings ({data?.data?.reviews.length})
        </h1>

        {/* review card */}
        {data?.data?.reviews
          .slice()
          .reverse()
          .map((review: IReview, index: number, reviewsArray: IReview[]) => (
            <div key={review._id}>
              <div className="flex items-center gap-x-3">
                <img
                  src={
                    review?.image
                      ? review?.image
                      : "https://media.istockphoto.com/id/1008484130/vector/creative-vector-illustration-of-default-avatar-profile-placeholder-isolated-on-background.jpg?s=612x612&w=0&k=20&c=H57e2HUi6qDyPoBl8Om1dlX22--BqgGp64cFKsywWZ0="
                  }
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <span className="text-sm font-bold text-slate-700">
                    {review?.username}
                  </span>
                  <div className="flex items-center gap-3">
                    {/* render star based on ratings */}
                    <span className="flex items-center">
                      {Array.from({ length: 5 }, (_, index) => (
                        <svg
                          key={index}
                          fill={
                            index < review?.rating ? "currentColor" : "none"
                          }
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          className="w-4 h-4 text-[#16a571]"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                      ))}
                    </span>
                    {review?.rating} out of 5
                  </div>
                </div>
              </div>
              <div>
                <p className="mt-2 text-sm">{review?.comment}</p>
              </div>
              {/* Conditionally render the horizontal line */}
              {index !== reviewsArray.length - 1 && (
                <hr className="border-b-1 border-gray-200 my-6" />
              )}
            </div>
          ))}
      </div>
    </section>
  );
};

export default BookDetails;
