import { Button } from "@/components/ui/button";
import { BookCard } from "../custom_components/books/BookCard";
import Error from "../custom_components/Error";
import Loader from "../custom_components/Loader";
import { useGetAllBookQuery } from "../redux/api/bookApi";
import { Types } from "mongoose";
import { Link } from "react-router-dom";

export type genre =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";

export interface IFrontendBook {
  _id: Types.ObjectId;
  title: string;
  author: string;
  genre: genre;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

const BooksPage = () => {
  const { data, isLoading, isError, } = useGetAllBookQuery();
  const books = data?.data;
  console.log(books);
  if (isLoading) return <Loader />;

  if (isError) {
    return <Error />;
  }

  return (
    <main className="container py-1 0 px-5">
      <h1 className="text-xl font-bold my-4 text-center">📚 Book List</h1>
      <div className="flex justify-end mb-3">
        <Link to="/create-book">
      <Button className="bg-[#030208] hover:bg-[#3b3160] text-white">
        ➕ Add New Book
      </Button>
    </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books?.map((book: IFrontendBook) => (
          <BookCard key={book.isbn} book={book} />
        ))}
      </div>
    </main>
  );
};

export default BooksPage;
