import express, { Application, Request, Response } from "express";
import cors from "cors"
import bookController, { BookCreateController, BookEditController } from "./app/controllers/book_controllers";
import globalErrorHandler from "./app/middleware/globalError";
import borrowRouter from "./app/controllers/borrow_controllers";

const app: Application = express();

const allowedOrigins = [
  "http://localhost:5173", 
  "https://your-frontend-name.vercel.app" 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());
app.use("/books", bookController)
app.use("/create-book", BookCreateController)
app.use("/edit-book", BookEditController)
app.use("/borrow", borrowRouter)


app.get("/", (req: Request, res: Response) => {
  res.redirect("/books")
});

app.use(globalErrorHandler)

export default app;
