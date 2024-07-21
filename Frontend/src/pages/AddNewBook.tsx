import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { usePostBookMutation } from "../redux/features/books/bookApi";
import { useAppSelector } from "../redux/hook";
import { IBook } from "../types/globalTypes";

const AddNewBook = () => {
  const [postBook, { isLoading, isError }] = usePostBookMutation();
  const { user } = useAppSelector((state) => state.user);

  console.log(isLoading, isError);

  // Create the form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IBook>();

  // Define the onSubmit function with the correct type
  const onSubmit: SubmitHandler<IBook> = (data) => {
    const bookData = {
      ...data,
      userEmail: user?.email,
      coverImage:
        "https://images.unsplash.com/photo-1608659597669-b45511779f93?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", //just add a new field for book cover placeholder in current object
    };
    postBook(bookData);
    reset();

    // success toast
    toast.success("Book added successfully");
  };
  return (
    <section className="w-full flex items-center justify-center bg-lime-50 py-24">
      <div className="bg-white px-6 py-6 rounded-xl w-96 shadow">
        <div className="text-center pb-8">
          <h3 className="text-lg font-bold">Add a new Book</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="font-medium">Book Title</label>
            <input
              type="text"
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
              Add Book
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddNewBook;
