import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/auth/userSlice";
import { bookApi } from "./features/books/bookApi";
import bookReducer from "./features/books/bookSlice";
import wishlistReducer from "./features/books/wishlistSlice";

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
    book: bookReducer,
    wishlist: wishlistReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
