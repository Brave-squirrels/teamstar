import {
  configureStore, getDefaultMiddleware, ThunkAction,
  Action
} from "@reduxjs/toolkit";

import thunk from "redux-thunk";

import loginUser from './test/loginUser';

export const store = configureStore({
  reducer: {
    loginUser,
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