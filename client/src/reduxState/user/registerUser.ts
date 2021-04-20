import { createSlice } from "@reduxjs/toolkit";
import axios from "axios/axiosMain";
import { AppThunk, RootState } from 'reduxState/store';

interface State {
    loading: boolean;
    success: boolean;
}

interface Data {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
}

const initialState: State = {
    loading: false,
    success: false
}

const createUser = createSlice({
    name: 'createUser',
    initialState,
    reducers: {
        start: (state) => {
            state.loading = true;
            state.success = false;
        },
        success: (state) => {
            state.loading = false;
            state.success = true;
        },
        failed: (state) => {
            state.loading = false;
            state.success = false;
        }
    }
})

export const { start, success, failed } = createUser.actions;

export const createUserFetch = (data: Data): AppThunk => async (dispatch) => {
    dispatch(start());
    await axios.post('/users/create', data)
        .then((res) => {
            dispatch(success());
        })
        .catch((err) => {
            dispatch(failed());
        })
}

export const selectLoading = (state: RootState) => state.createUser.loading;
export const selectSuccess = (state: RootState) => state.createUser.success;

export default createUser.reducer;