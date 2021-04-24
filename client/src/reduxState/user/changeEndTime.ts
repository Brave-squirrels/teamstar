import { createSlice } from "@reduxjs/toolkit";
import axios from "axios/axiosMain";
import { AppThunk, RootState } from 'reduxState/store';
import toastNofity from "utils/toastNotify";

interface State {
    loading: boolean;
    success: boolean;
}

interface Data {
    endTime: string;
}

const initialState: State = {
    loading: false,
    success: false,
}

const changeEndTime = createSlice({
    name: 'changeEndTime',
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

export const { start, success, failed } = changeEndTime.actions;

export const changeEndTimeFetch = (data: Data): AppThunk => async (dispatch) => {
    dispatch(start());
    await axios.put('/users/endTime', data, {
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

export const selectLoading = (state: RootState) => state.changeEndTime.loading;
export const selectSuccess = (state: RootState) => state.changeEndTime.success;

export default changeEndTime.reducer;