import { createSlice } from "@reduxjs/toolkit";
import axios from "axios/axiosMain";
import { AppThunk, RootState } from "reduxState/store";
import toastNofity from "utils/toastNotify";

interface State {
    success: boolean;
    loading: boolean;
}

const initialState: State = {
    success: false,
    loading: false,
};

const leaveTeam = createSlice({
    name: "leaveTeam",
    initialState,
    reducers: {
        start: (state) => {
            state.success = false;
            state.loading = true;
        },
        success: (state) => {
            state.success = true;
            state.loading = false;
        },
        failed: (state) => {
            state.success = false;
            state.loading = false;
        },
    },
});

export const { start, success, failed } = leaveTeam.actions;

export const leaveTeamFetch = (teamId: string): AppThunk => async (dispatch) => {
    dispatch(start());
    await axios
        .put(`/teams/${teamId}/leaveTeam`, {}, {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
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


export const selectLoading = (state: RootState) => state.leaveTeam.loading;
export const selectSuccess = (state: RootState) => state.leaveTeam.success;

export default leaveTeam.reducer;
