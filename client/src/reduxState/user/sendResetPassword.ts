import { createSlice } from "@reduxjs/toolkit";
import axios from "axios/axiosMain";
import { AppThunk, RootState } from 'reduxState/store';
import toastNofity from "utils/toastNotify";

interface State {
    loading: boolean;
    success: boolean;
}

interface Data {
    email: string;
}

const initialState: State = {
    loading: false,
    success: false,
}

const sendReset = createSlice({
    name: 'sendReset',
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

export const { start, success, failed } = sendReset.actions;

export const sendResetFetch = (data: Data): AppThunk => async (dispatch) => {
    dispatch(start());
    await axios.post('/users/sendreset', data)
        .then(res => {
            dispatch(success());
            toastNofity(res.status);
        }).catch((err) => {
            dispatch(failed());
            toastNofity(err.response.status, err.response.data);
        })
}

export const selectLoading = (state: RootState) => state.sendReset.loading;
export const selectSuccess = (state: RootState) => state.sendReset.success;

export default sendReset.reducer;