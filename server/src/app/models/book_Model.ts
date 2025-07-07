import mongoose, { Model } from "mongoose";
import { IBook, IBookAvailablityCheak } from "../interfaces/book_Interface";

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

bookSchema.pre('save', function(next) {
  if (this.isModified('copies') || this.isNew) { 
    this.available = this.copies > 0;
  }
  next();
});

bookSchema.static("bookAvailablity", async function bookAvailablity(reqBook) {
  const { book, quantity, dueDate } = reqBook;

  const existingBook = await this.findOne({ _id: book });
  if (!existingBook || existingBook.copies < quantity) {
    return null;
  }

  const newCopies = existingBook.copies - quantity;
  const isAvailable = newCopies > 0;

  await this.updateOne(
    { _id: book },
    {
      $set: {
        copies: newCopies,
        available: isAvailable,
      },
    }
  );
  return { book, quantity, dueDate };
});


export const BooksModel = mongoose.model<IBook, IBookAvailablityCheak>("Books", bookSchema)
