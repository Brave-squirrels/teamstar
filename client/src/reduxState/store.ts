import {
  configureStore, getDefaultMiddleware, ThunkAction,
  Action
} from "@reduxjs/toolkit";

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
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;