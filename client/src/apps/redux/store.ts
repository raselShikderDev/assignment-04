import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./feature/BookSlice";
import { bookApi } from "./api/bookApi";
import { borrowApi } from "./api/borrowApi";
const store = configureStore({
  reducer: {
    book: bookSlice,
    [bookApi.reducerPath]: bookApi.reducer,
    [borrowApi.reducerPath]: borrowApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(bookApi.middleware)
      .concat(borrowApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
