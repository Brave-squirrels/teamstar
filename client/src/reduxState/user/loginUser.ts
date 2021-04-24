import { createSlice } from "@reduxjs/toolkit";
import axios from "axios/axiosMain";
import { AppThunk, RootState } from "reduxState/store";
import toastNofity from "utils/toastNotify";

import * as types from 'utils/types';

interface User {
  authenticated: boolean;
  userData: types.UserData | null;
  loading: boolean;
}

interface Data {
  email: string;
  password: string;
}

const initialState: User = {
  authenticated: false,
  userData: { ...types.UserBasic },
  loading: false,
};

const loginUser = createSlice({
  name: "loginUser",
  initialState,
  reducers: {
    login: (state) => {
      state.authenticated = false;
      state.userData = { ...types.UserBasic };
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.authenticated = true;
      state.userData = action.payload;
      state.loading = false;
    },
    loginFailed: (state) => {
      state.authenticated = false;
      state.userData = { ...types.UserBasic };
      state.loading = false;
    },
    logout: (state) => {
      localStorage.clear();
      state.authenticated = false;
      state.userData = { ...types.UserBasic };
      state.loading = false;
    },
  },
});

export const { login, loginSuccess, loginFailed, logout } = loginUser.actions;

export const loginUserFetch = (data: Data): AppThunk => async (dispatch) => {
  dispatch(login());
  await axios
    .post("/login", data)
    .then((res) => {
      dispatch(loginSuccess(res.data));
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem('id', res.data.id);
      toastNofity(res.status, "Logged in succesfully!");
    })
    .catch((err) => {
      localStorage.clear();
      dispatch(loginFailed());
      toastNofity(err.response.status, err.response.data);
    });
};

export const authUser = (): AppThunk => async (dispatch) => {
  dispatch(login());
  await axios
    .get("users/me", {
      headers: { "x-auth-token": localStorage.getItem("token") },
    })
    .then((res) => {
      dispatch(loginSuccess(res.data));
    })
    .catch((err) => {
      dispatch(logout());
    });
};

export const selectAuth = (state: RootState) => state.loginUser.authenticated;
export const selectData = (state: RootState) => state.loginUser.userData;
export const selectLoading = (state: RootState) => state.loginUser.loading;

export default loginUser.reducer;
