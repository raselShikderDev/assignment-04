import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export type genre =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";

export interface IBook {
  title: string;
  author: string;
  genre: genre;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

interface initialState {
  books: IBook[];
}

const initialState: initialState = {
  books: [],
};
const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    increment: (state) => {
      state.books.push({
        title: "Test Book",
        author: "John Doe",
        genre: "FICTION",
        isbn: "1234567890",
        description: "This is a test book.",
        copies: 5,
        available: true,
      });
    },
  },
});

export const bookSelector = (state: RootState) => state.book.books;

export const { increment } = bookSlice.actions;

export default bookSlice.reducer;
