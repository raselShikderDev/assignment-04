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
