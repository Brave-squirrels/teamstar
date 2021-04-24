import { createSlice } from "@reduxjs/toolkit";
import axios from "axios/axiosMain";
import { AppThunk, RootState } from "reduxState/store";
import toastNofity from "utils/toastNotify";

interface State {
    loading: boolean;
    success: boolean;
}

interface Data {
    title: string;
    start: any;
    end: any;
    desc: string;
    fromHour: string;
    toHour: string;
}

const initialState: State = {
    loading: false,
    success: false,
};

const addEvent = createSlice({
    name: "addEvent",
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
        },
    },
});

export const { start, success, failed } = addEvent.actions;

export const addEventFetch = (data: Data, calendarId: any): AppThunk => async (
    dispatch
) => {
    dispatch(start());
    await axios
        .put(`/calendar/${calendarId}`, data, {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            },
        })
        .then((res) => {
            dispatch(success());
            toastNofity(res.status);
        })
        .catch((err) => {
            dispatch(failed());
            toastNofity(err.response.status, err.response.data);
        });
};

export const selectLoading = (state: RootState) => state.addEvent.loading;
export const selectSuccess = (state: RootState) => state.addEvent.success;

export default addEvent.reducer;
