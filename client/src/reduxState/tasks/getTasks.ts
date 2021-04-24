import { createSlice } from "@reduxjs/toolkit";
import axios from "axios/axiosMain";
import { AppThunk, RootState } from "reduxState/store";
import toastNofity from "utils/toastNotify";

import * as types from 'utils/types';
interface State {
    loading: boolean;
    taskData: types.TaskSchema[];
}

const initialState: State = {
    loading: false,
    taskData: [{ ...types.basicTask }]
};

const getTasks = createSlice({
    name: "getTasks",
    initialState,
    reducers: {
        start: (state) => {
            state.loading = true;
            state.taskData = [{ ...types.basicTask }]
        },
        success: (state, action) => {
            state.loading = false;
            state.taskData = action.payload;
        },
        failed: (state) => {
            state.loading = false;
            state.taskData = [{ ...types.basicTask }]
        },
    },
});

export const { start, success, failed } = getTasks.actions;

export const getTasksFetch = (teamId: string): AppThunk => async (
    dispatch
) => {
    dispatch(start());
    await axios
        .get(`/teams/${teamId}/tasks`, {
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

export const selectLoading = (state: RootState) => state.getTasks.loading;
export const selectData = (state: RootState) => state.getTasks.taskData;

export default getTasks.reducer;
