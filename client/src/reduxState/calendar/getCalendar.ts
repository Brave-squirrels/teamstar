import { createSlice } from "@reduxjs/toolkit";
import axios from "axios/axiosMain";
import { AppThunk, RootState } from "reduxState/store";
import toastNofity from "utils/toastNotify";

import * as types from 'utils/types';
interface State {
    loading: boolean;
    calendarData: types.CalenderSchema;
}

const initialState: State = {
    loading: false,
    calendarData: types.basicCalendar
};

const getCalendar = createSlice({
    name: "getCalendar",
    initialState,
    reducers: {
        start: (state) => {
            state.loading = true;
            state.calendarData = types.basicCalendar
        },
        success: (state, action) => {
            state.loading = false;
            state.calendarData = action.payload;
        },
        failed: (state) => {
            state.loading = false;
            state.calendarData = types.basicCalendar
        },
    },
});

export const { start, success, failed } = getCalendar.actions;

export const getCalendarFetch = (calendarId: any): AppThunk => async (
    dispatch
) => {
    dispatch(start());
    await axios
        .get(`/calendar/${calendarId}`, {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            },
        })
        .then((res) => {
            dispatch(success(res.data));
        })
        .catch((err) => {
            dispatch(failed());
            toastNofity(err.response.status, err.response.data);
        });
};

export const selectLoading = (state: RootState) => state.getCalendar.loading;
export const selectData = (state: RootState) => state.getCalendar.calendarData;

export default getCalendar.reducer;
