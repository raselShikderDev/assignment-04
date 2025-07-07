import { Model } from "mongoose";
import { IBookBorrowDataForCreation } from "./borow_interfaces";

export type genre = "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY"

export interface IBook {
  title: string;
  author:string;
  genre:genre;
  isbn:string;
  description:string;
  copies:number;
  available:boolean;
}

export interface IBookAvailablityCheak extends Model<IBook>{
  bookAvailablity(value:{book:string, quantity:number}):Promise<IBookBorrowDataForCreation | null>;
}