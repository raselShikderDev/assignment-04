import mongoose, { Model } from "mongoose";
import { IBook } from "../interfaces/book_Interface";

const bookSchema = new mongoose.Schema<IBook>({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    enum: {
      values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
      message: "{VALUE} is not valid as genre",
    },
    required: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: [true, "ISBN must be unique"],
  },
  description: String,
  copies: {
    type: Number,
    min: [0, "Copies must be a non-negative integer"],
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
});

export const BooksModel = mongoose.model<IBook>("Books", bookSchema)
