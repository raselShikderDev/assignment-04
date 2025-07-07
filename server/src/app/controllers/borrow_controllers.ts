import express, { NextFunction, Request, Response } from "express";
import { borrowModel } from "../models/borrow_model";
const borrowRouter = express.Router();
import { borrowZodSchema } from "../zodSchema/borrowZodSchema";
import { BooksModel } from "../models/book_Model";


borrowRouter.post("/:bookId", async (req: Request, res: Response, next:NextFunction) => {
  try {
    console.log("Staring Borrowing Book");
    const body = await borrowZodSchema.parseAsync(req.body);
    console.log("Body: ", body);
    const availableBook = await BooksModel.bookAvailablity(body);
    if (!availableBook) {
      res.status(404).json({
        success: false,
        message: "Book not found or not enough copies available",
      });
      return
    }

    const BorrowRecord = new borrowModel(availableBook);
    const createBorrowRecord = await BorrowRecord.save();
    console.log("Borrowed Record :", createBorrowRecord);
    
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: createBorrowRecord,
    });
  } catch (error) {
    next(error)
  }
});

borrowRouter.get("/", async (req: Request, res: Response, next:NextFunction) => {
  try {
    const bookInfoBorrow = await borrowModel.aggregate([
      {
        $lookup: {
          from: "books",
          localField: "book",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      {
        $group: {
          _id: "$bookDetails.title",
          totalQuantity: { $sum: "$quantity" },
          isbn: { $first: "$bookDetails.isbn" },
        },
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$_id",
            isbn: "$isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    const summeryInOrder = bookInfoBorrow.map((item) => ({
      book: item.book,
      totalQuantity: item.totalQuantity,
    }));

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summeryInOrder,
    });
  } catch (error) {
    next(error)
  }
});

export default borrowRouter;