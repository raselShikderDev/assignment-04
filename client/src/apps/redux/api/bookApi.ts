import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFrontendBook } from "src/apps/pages/BooksPage";
interface IBooksApiResponse {
  success: boolean;
  message: string;
  data: IFrontendBook[];
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
    getBookById: builder.query<IFrontendBook, string>({
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
    editBook: builder.mutation({
      query: (id) => ({
        url: `/edit-book/:${id}`,
        method: "PATCH",
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
