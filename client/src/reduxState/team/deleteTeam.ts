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

const deleteTeam = createSlice({
    name: "deleteTeam",
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

export const { start, success, failed } = deleteTeam.actions;

export const deleteTeamFetch = (teamId: string): AppThunk => async (dispatch) => {
    dispatch(start());
    await axios
        .delete(`/teams/${teamId}`, {
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


export const selectLoading = (state: RootState) => state.deleteTeam.loading;
export const selectSuccess = (state: RootState) => state.deleteTeam.success;

export default deleteTeam.reducer;
