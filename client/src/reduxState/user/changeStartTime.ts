import { createSlice } from "@reduxjs/toolkit";
import axios from "axios/axiosMain";
import { AppThunk, RootState } from 'reduxState/store';
import toastNofity from "utils/toastNotify";

interface State {
    loading: boolean;
    success: boolean;
}

interface Data {
    startTime: string;
}

const initialState: State = {
    loading: false,
    success: false,
}

const changeStartTime = createSlice({
    name: 'changeStartTime',
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

export const { start, success, failed } = changeStartTime.actions;

export const changeStartTimeFetch = (data: Data): AppThunk => async (dispatch) => {
    dispatch(start());
    await axios.put('/users/startTime', data, {
        headers: {
            'x-auth-token': localStorage.getItem('token')
        }
    })
        .then(res => {
            dispatch(success());
            toastNofity(res.status);
        }).catch((err) => {
            dispatch(failed());
            toastNofity(err.response.status, err.response.data);
        })
}

export const selectLoading = (state: RootState) => state.changeStartTime.loading;
export const selectSuccess = (state: RootState) => state.changeStartTime.success;

export default changeStartTime.reducer;