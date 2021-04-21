import {
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";

import thunk from "redux-thunk";

import loginUser from "reduxState/user/loginUser";
import createUser from 'reduxState/user/registerUser';
import sendReset from 'reduxState/user/sendResetPassword';
import sendAgain from 'reduxState/user/sendAgain';
import resetPassword from 'reduxState/user/resetPassword';

export const store = configureStore({
  reducer: {
    loginUser,
    createUser,
    sendReset,
    sendAgain,
    resetPassword,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    thunk,
  ],
  devTools: process.env.REACT_APP_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
