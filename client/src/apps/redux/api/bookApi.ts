import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BookFormValues } from "src/apps/custom_components/books/EditBook";
import { IFrontendBook } from "src/apps/pages/BooksPage";
interface IBooksApiResponse {
  success: boolean;
  message: string;
  data: IFrontendBook[];
}

interface ApiOneBookResponse<T> {
  success: boolean;
  message: string;
  data: T;
}


export interface IBorrowRequest {
  book: string;        // Book ID as string
  quantity: number;
  dueDate: string;     // Dates are usually strings in JSON
}

export interface IBorrowResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    book: string;
    quantity: number;
    dueDate: string;
  };
}

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getAllBook: builder.query<IBooksApiResponse, void>({
      query: () => "books",
      providesTags: ["Books"],
    }),
    getBookById: builder.query<ApiOneBookResponse<IFrontendBook>, string>({
      query: (id) => `books/${id}`,
    }),
    createABook: builder.mutation({
      query: (newBook) => ({
        url: "create-book",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
     editBook: builder.mutation<ApiOneBookResponse<IFrontendBook>, { id: string; data: BookFormValues }>({
      query: ({ id, data }) => ({ 
        url: `edit-book/${id}`, 
        method: "PATCH", 
        body: data, 
      }),
      invalidatesTags: ["Books"],
    }),
  
  }),
});

export const {
  useGetAllBookQuery,
  useGetBookByIdQuery,
  useCreateABookMutation,
  useDeleteBookMutation,
  useEditBookMutation,
} = bookApi;
