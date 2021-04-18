import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import thunk from "redux-thunk";

import testData from "./test/test";

export const store = configureStore({
  reducer: {
    testData,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    thunk,
  ],
  devTools: process.env.REACT_APP_ENV === "development",
});
