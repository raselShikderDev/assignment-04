import { z } from "zod";

export const bookFormZod = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  author: z.string().min(1, { message: "Author is required" }),
  genre: z.enum([
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY"
  ], { errorMap: () => ({ message: "Invalid genre" }) }),
  isbn: z.string().min(1),
  description: z.string().optional(),
  copies: z.number().int().min(0, { message: "Copies must be ≥ 0" }),
  available: z.boolean(),
  __v: z.number().optional(),
});