import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { DeleteBookButton } from "./deleteDialoge";
import { Types } from "mongoose";

export type Genre =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";

export interface IBookFromDB {
  _id: Types.ObjectId;
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  __v?: number;
}
interface BookCardProps {
  book: IBookFromDB;
}
export const BookCard: React.FC<BookCardProps> = ({ book }) => {

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle>Title: {book.title}</CardTitle>
        <p className="text-sm text-muted-foreground">by {book.author}</p>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p>
          <span className="font-medium">Genre:</span> {book.genre}
        </p>
        <p>
          <span className="font-medium">ISBN:</span> {book.isbn}
        </p>
        <p>
          <span className="font-medium">Copies:</span> {book.copies}
        </p>
        <Badge
          variant={
            book.available && book.copies > 0 ? "secondary" : "secondary"
          }
          className={
            book.copies === 0 || !book.available
              ? "opacity-50 cursor-not-allowed"
              : ""
          }
        >
          {book.copies === 0
            ? "Out of Stock"
            : book.available
            ? "Available"
            : "Unavailable"}
        </Badge>

        <div className="flex gap-2 mt-4">
          <Link to={`/edit-book/${book._id}`} className="inline-block">
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </Link>
          {book.copies > 0 ? (
            <Link to={`/borrow/${book._id}`} className="inline-block">
              <Button
                className="bg-[#030208] hover:bg-[#3b3160] text-white"
                size="sm"
              >
                Borrow
              </Button>
            </Link>
          ) : (
            <Button className="bg-gray-400 text-white" size="sm" disabled>
              Borrow
            </Button>
          )}
          <DeleteBookButton id={book._id.toString()} />
        </div>
      </CardContent>
    </Card>
  );
};
