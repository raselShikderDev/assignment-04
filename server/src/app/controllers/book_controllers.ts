import express, { NextFunction, Request, Response } from "express";
import { BooksModel } from "../models/book_Model";
import { FormBookZod, deleteBookZod, paramsIdZod, updateBookZod } from "../zodSchema/bookZodSchema";
import z from "zod";

const bookController = express.Router();
export const BookCreateController = express.Router();
export const BookEditController = express.Router();

const FormFrontendBookZod = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  genre: z.enum(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]),
  isbn: z.string(),
  description: z.string().optional(),
  copies: z.number().int().min(0),
  available: z.boolean().default(true),
});

BookCreateController.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Incoming body:", req.body);
      console.log("Started creating Book");
      const book = await FormFrontendBookZod.parseAsync(req.body);
      const newBook = new BooksModel(book);
      const savedBook = await newBook.save();
      if (!savedBook) {
        next("Creating Book is faild");
      }
      console.log("Book successfully created", savedBook);

      res.status(201).json({
        success: true,
        message: "Book successfully created",
        data: savedBook,
      });
    } catch (error) {
      console.error(" Error while creating book:", error);
      next(error);
    }
  }
);

bookController.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Initializing to fetcing all books");

      const booksResults = await BooksModel.find();
      if (!booksResults) {
        next("Book not found")
        return
      }
      // const books = await z.array(bookZod).parseAsync(booksResults);
      const books = booksResults
      console.log(`booksResults ${books}`);
      res.status(200).json({
        success: true,
        message: "Book successfully retrived",
        data: books,
      });
    } catch (error) {
      next(error);
    }
  }
);

bookController.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("➡️ DELETE /books/:id called");
    try {
      console.log("📦 req.params:", req.params);
      const { id } = await deleteBookZod.parseAsync(req.params);
      const deletedBook = await BooksModel.findByIdAndDelete(id);
      if (!deletedBook) {
        next("Book not found");
        return;
      }
      console.log("🗑️ Deleted book:", deletedBook);
      res.status(200).json({
        success: true,
        message: "Book deleted successfully",
      });
    } catch (error) {
      next();
    }
  }
);

bookController.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = await paramsIdZod.parseAsync(req.params);
    const book = await BooksModel.findById(id);

    if (!book) {
       res.status(404).json({
          success: false,
          message: `Book with Id ${id} not found`,
          error: {
            name: "ResourceNotFoundError",
            message: "The specified book could not be found.",
          },
        });
        return
    }

    res.status(200).json({
      success: true,
      message: "Book fetched successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
});

BookEditController.patch("/:id", async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const { id } = await paramsIdZod.parseAsync(req.params);
    const body = await updateBookZod.parseAsync(req.body) 
    if (Object.keys(body).length === 0) {
        res.status(400).json({
          success: false,
          error: {
            name: "ResourceNotFoundError",
            message: `No update information provided in the request body.`,
          },
        });
        return;
      }
    const updatedBook = await BooksModel.findByIdAndUpdate(id, body, {new:true})
      if (!updatedBook) {
        res.status(404).json({
          success: false,
          message: `Book with Id ${id} not found`,
          error: {
            name: "ResourceNotFoundError",
            message: "The specified book could not be found.",
          },
        });
        return;
      }
      res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: updatedBook,
      });
  } catch (error) {
    next(error)
  }
})

export default bookController;
