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

const deleteTask = createSlice({
    name: "deleteTask",
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

export const { start, success, failed } = deleteTask.actions;

export const deleteTaskFetch = (
    teamId: string,
    taskId: string
): AppThunk => async (dispatch) => {
    dispatch(start());
    await axios
        .delete(`/teams/${teamId}/tasks/${taskId}`, {
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

export const selectLoading = (state: RootState) => state.deleteTask.loading;
export const selectSuccess = (state: RootState) => state.deleteTask.success;

export default deleteTask.reducer;
