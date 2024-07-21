import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// declare book state interface
interface BookState {
  searchQuery: string;
  selectedGenre: string;
  selectedPublicationYear: string;
}

// declare state
const initialState: BookState = {
  searchQuery: "",
  selectedGenre: "",
  selectedPublicationYear: "",
};

// create book slice
const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedGenre: (state, action: PayloadAction<string>) => {
      state.selectedGenre = action.payload;
    },
    setSelectedPublicationYear: (state, action: PayloadAction<string>) => {
      state.selectedPublicationYear = action.payload;
    },
  },
});

export const { setSearchQuery, setSelectedGenre, setSelectedPublicationYear } =
  bookSlice.actions;

export default bookSlice.reducer;
