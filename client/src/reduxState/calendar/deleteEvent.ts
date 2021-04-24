import { createSlice } from "@reduxjs/toolkit";
import axios from "axios/axiosMain";
import { AppThunk, RootState } from "reduxState/store";
import toastNofity from "utils/toastNotify";

interface State {
    loading: boolean;
    success: boolean;
}

const initialState: State = {
    loading: false,
    success: false,
};

const deleteEvent = createSlice({
    name: "deleteEvent",
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

export const { start, success, failed } = deleteEvent.actions;

export const deleteEventFetch = (calendarId: any, eventId: any): AppThunk => async (
    dispatch
) => {
    dispatch(start());
    await axios
        .put(`/calendar/${calendarId}/event/${eventId}`, {}, {
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

export const selectLoading = (state: RootState) => state.deleteEvent.loading;
export const selectSuccess = (state: RootState) => state.deleteEvent.success;

export default deleteEvent.reducer;
