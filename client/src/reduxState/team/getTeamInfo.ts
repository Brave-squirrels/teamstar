import { createSlice } from "@reduxjs/toolkit";
import axios from "axios/axiosMain";
import { AppThunk, RootState } from "reduxState/store";
import toastNofity from "utils/toastNotify";

import * as types from 'utils/types';

interface Team {
    teamData: types.TeamData | null;
    loading: boolean;
}

const initialState: Team = {
    teamData: { ...types.basicTeam },
    loading: false,
};

const teamData = createSlice({
    name: "teamData",
    initialState,
    reducers: {
        start: (state) => {
            state.teamData = { ...types.basicTeam };
            state.loading = true;
        },
        success: (state, action) => {
            state.teamData = action.payload;
            state.loading = false;
        },
        failed: (state) => {
            state.teamData = { ...types.basicTeam };
            state.loading = false;
        },
    },
});

export const { start, success, failed } = teamData.actions;

export const teamDataFetch = (teamId: string): AppThunk => async (dispatch) => {
    dispatch(start());
    await axios
        .get(`/teams/${teamId}`, {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        })
        .then((res) => {
            dispatch(success(res.data));
            toastNofity(res.status);
        })
        .catch((err) => {
            dispatch(failed());
            toastNofity(err.response.status, err.response.data);
        });
};


export const selectLoading = (state: RootState) => state.teamData.loading;
export const selectData = (state: RootState) => state.teamData.teamData;

export default teamData.reducer;
