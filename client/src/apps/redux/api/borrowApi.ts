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

export interface IAggregatedBorrowSummary {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

export interface IBorrowSummaryApiResponse {
  success: boolean;
  message: string;
  data: IAggregatedBorrowSummary[];
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
    getBorrowSummary: builder.query<IBorrowSummaryApiResponse, void>({
      query: () => "/", 
      providesTags: ["Borrows"],
    }),
  }),
});



export const { useCreateBorrowMutation, useGetBorrowSummaryQuery } = borrowApi;