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

const deleteRaport = createSlice({
    name: "deleteRaport",
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

export const { start, success, failed } = deleteRaport.actions;

export const deleteRaportFetch = (teamId: any, raportId: any): AppThunk => async (
    dispatch
) => {
    dispatch(start());
    await axios
        .delete(`/teams/${teamId}/raports/${raportId}`, {
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

export const selectLoading = (state: RootState) => state.deleteRaport.loading;
export const selectSuccess = (state: RootState) => state.deleteRaport.success;

export default deleteRaport.reducer;
