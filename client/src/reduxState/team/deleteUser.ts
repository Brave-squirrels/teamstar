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

interface Data {
    id: any;
}

const deleteUserTeam = createSlice({
    name: "deleteUserTeam",
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

export const { start, success, failed } = deleteUserTeam.actions;

export const deleteUserTeamFetch = (teamId: string, data: Data): AppThunk => async (dispatch) => {
    dispatch(start());
    await axios
        .put(`/teams/${teamId}/deleteUser`, data, {
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


export const selectLoading = (state: RootState) => state.deleteUserTeam.loading;
export const selectSuccess = (state: RootState) => state.deleteUserTeam.success;

export default deleteUserTeam.reducer;
