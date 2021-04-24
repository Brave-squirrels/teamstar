import { createSlice } from "@reduxjs/toolkit";
import axios from "axios/axiosMain";
import { AppThunk, RootState } from "reduxState/store";
import toastNofity from "utils/toastNotify";

interface State {
    loading: boolean;
    success: boolean;
}

interface Data {
    name: string,
    description: string,
}

const initialState: State = {
    loading: false,
    success: false,
};

const createRaport = createSlice({
    name: "createRaport",
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

export const { start, success, failed } = createRaport.actions;

export const createRaportFetch = (data: Data, teamId: any): AppThunk => async (
    dispatch
) => {
    dispatch(start());
    await axios
        .post(`/teams/${teamId}`, data, {
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

export const selectLoading = (state: RootState) => state.createRaport.loading;
export const selectSuccess = (state: RootState) => state.createRaport.success;

export default createRaport.reducer;
