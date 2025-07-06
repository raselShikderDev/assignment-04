import express, { Application, Request, Response } from "express";
import cors from "cors"
import bookController, { BookCreateController, BookEditController } from "./app/controllers/book_controllers";
import globalErrorHandler from "./app/middleware/globalError";

const app: Application = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use("/books", bookController)
app.use("/create-book", BookCreateController)
app.use("/edit-book", BookEditController)


app.get("/", (req: Request, res: Response) => {
  res.redirect("/books")
});

app.use(globalErrorHandler)

export default app;
