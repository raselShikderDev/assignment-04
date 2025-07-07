import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IBorrowRequest {
  book: string;        
  quantity: number;
  dueDate: string;
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

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://server-mylibray.onrender.com/borrow/" }),
  tagTypes: [ "Borrows"],
  endpoints: (builder) => ({
    createBorrow: builder.mutation<IBorrowResponse, IBorrowRequest>({
      query: (borrowData) => ({
        url: `/${borrowData.book}`,          
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["Borrows"],
    }),
  }),
});



export const { useCreateBorrowMutation  } = borrowApi;