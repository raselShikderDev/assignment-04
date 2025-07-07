import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import BooksPage from "../pages/BooksPage";
import CreatePage from "../pages/createPage";
import EditPage from "../pages/editPage";
import BorrowForm from "../pages/borroForm";
import BorrowSummaryPage from "../pages/BorrowSummaryPage";
export const route = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { path: "/books", Component: BooksPage, },
      { path: "/create-book", Component: CreatePage },
      { path: "edit-book/:id", Component: EditPage },
      { path: "borrow/:bookId", Component: BorrowForm },
      { path: "/borrow-summary", Component: BorrowSummaryPage },
    ],
  },
]);
