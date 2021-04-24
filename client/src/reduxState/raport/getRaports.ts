import { createSlice } from "@reduxjs/toolkit";
import axios from "axios/axiosMain";
import { AppThunk, RootState } from "reduxState/store";
import toastNofity from "utils/toastNotify";

import * as types from 'utils/types';
interface State {
    loading: boolean;
    raportData: types.Raport[];
}

const initialState: State = {
    loading: false,
    raportData: [{ ...types.basicRaport }]
};

const getRaports = createSlice({
    name: "getRaports",
    initialState,
    reducers: {
        start: (state) => {
            state.loading = true;
            state.raportData = [{ ...types.basicRaport }]
        },
        success: (state, action) => {
            state.loading = false;
            state.raportData = action.payload;
        },
        failed: (state) => {
            state.loading = false;
            state.raportData = [{ ...types.basicRaport }]
        },
    },
});

export const { start, success, failed } = getRaports.actions;

export const getRaportsFetch = (teamId: string): AppThunk => async (
    dispatch
) => {
    dispatch(start());
    await axios
        .get(`/teams/${teamId}/raports`, {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            },
        })
        .then((res) => {
            console.log(res.data);
            dispatch(success(res.data));
        })
        .catch((err) => {
            dispatch(failed());
            toastNofity(err.response.status, err.response.data);
        });
};

export const selectLoading = (state: RootState) => state.getRaports.loading;
export const selectData = (state: RootState) => state.getRaports.raportData;

export default getRaports.reducer;
