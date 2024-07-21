import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetOneBookQuery,
  useUpdateBookMutation,
} from "../redux/features/books/bookApi";
import { IBook } from "../types/globalTypes";

const EditBook = () => {
  // get book id from params
  const { id: bookId } = useParams();
  // for navigate
  const navigate = useNavigate();

  // fetching data by RTK Query
  const { data: book } = useGetOneBookQuery(bookId);
  const [updateBook, { isLoading, isError, isSuccess }] =
    useUpdateBookMutation();

  console.log(isLoading, isError, isSuccess);

  // Create the form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBook>();

  // Define the onSubmit function with the correct type
  const onSubmit: SubmitHandler<IBook> = (data) => {
    const options = {
      bookId: book?.data._id,
      data: data,
    };
    updateBook(options);

    // success toast
    toast.success("Book updated successfully");
  };

  // is Success return to book details page
  if (isSuccess) {
    navigate(`/book/${book?.data._id}`);
  }

  return (
    <section className="w-full flex items-center justify-center bg-lime-50 py-24">
      <div className="bg-white px-6 py-6 rounded-xl w-96 shadow">
        <div className="text-center pb-8">
          <h3 className="text-lg font-semibold">Edit Book</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="font-medium">Book Title</label>
            <input
              type="text"
              defaultValue={book?.data?.title}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-green-600 shadow-sm rounded-lg"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-red-500 mt-2 text-xs">
                Book title is required
              </span>
            )}
          </div>
          <div>
            <label className="font-medium">Author</label>
            <input
              type="text"
              defaultValue={book?.data?.author}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-green-600 shadow-sm rounded-lg"
              {...register("author", { required: true })}
            />
            {errors.author && (
              <span className="text-red-500 mt-2 text-xs">
                Author is required
              </span>
            )}
          </div>
          <div>
            <label className="font-medium">Genre</label>
            <input
              type="text"
              defaultValue={book?.data?.genre}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-green-600 shadow-sm rounded-lg"
              {...register("genre", { required: true })}
            />
            {errors.genre && (
              <span className="text-red-500 mt-2 text-xs">
                Genre is required
              </span>
            )}
          </div>
          <div>
            <label className="font-medium">Publication Year</label>
            <input
              type="number"
              min="1900"
              max="2099"
              step="1"
              defaultValue={book?.data?.publicationDate}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-green-600 shadow-sm rounded-lg"
              {...register("publicationDate", { required: true })}
            />
            {errors.publicationDate && (
              <span className="text-red-500 mt-2 text-xs">
                Publication Year is required
              </span>
            )}
          </div>

          <div className="pt-4">
            <button className="w-full px-4 py-2 text-white font-medium bg-green-600 hover:bg-green-500 active:bg-green-600 rounded-lg duration-150">
              {isLoading ? "Updating..." : "Update Book"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditBook;
