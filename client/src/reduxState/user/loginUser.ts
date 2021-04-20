import { createSlice } from "@reduxjs/toolkit";
import axios from "axios/axiosMain";
import { AppThunk, RootState } from 'reduxState/store';

interface User {
    authenticated: boolean;
    userData: any;
}

interface Data {
    email: string;
    password: string;
}

const initialState: User = {
    authenticated: false,
    userData: {}
}

const loginUser = createSlice({
    name: 'loginUser',
    initialState,
    reducers: {
        login: (state) => {
            state.authenticated = false;
            state.userData = null;
        },
        loginSuccess: (state, action) => {
            state.authenticated = true;
            state.userData = action.payload;
        },
        loginFailed: (state) => {
            state.authenticated = false;
            state.userData = null;
        },
        logout: (state) => {
            localStorage.clear();
            state.authenticated = false;
            state.userData = null;
        }
    }
})

export const { login, loginSuccess, loginFailed, logout } = loginUser.actions;

export const loginUserFetch = (data: Data): AppThunk => async (dispatch) => {
    dispatch(login());
    await axios.post('/login', data)
        .then((res) => {
            dispatch(loginSuccess(res.data));
            localStorage.setItem('token', res.data.token);
        })
        .catch((err) => {
            localStorage.clear();
            dispatch(loginFailed());
        })
}

export const authUser = (): AppThunk => async (dispatch) => {
    dispatch(login());
    await axios.get('users/me', { headers: { 'x-auth-token': localStorage.getItem('token') } })
        .then((res) => {
            dispatch(loginSuccess(res.data));
        })
        .catch(err => {
            dispatch(logout());
        })
}

export const selectAuth = (state: RootState) => state.loginUser.authenticated;
export const selectData = (state: RootState) => state.loginUser.userData;

export default loginUser.reducer;