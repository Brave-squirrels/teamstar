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
    description: string;
}

const changeTeamDescription = createSlice({
    name: "changeTeamDescription",
    initialState,
    reducers: {
        start: (state) => {
            state.success = false;
            state.loading = true;
        },
        success: (state, action) => {
            state.success = true;
            state.loading = false;
        },
        failed: (state) => {
            state.success = false;
            state.loading = false;
        },
    },
});

export const { start, success, failed } = changeTeamDescription.actions;

export const changeTeamDescriptionFetch = (data: Data, teamId: string): AppThunk => async (dispatch) => {
    dispatch(start());
    await axios
        .put(`/teams/${teamId}/changeDescription`, data, {
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


export const selectLoading = (state: RootState) => state.changeTeamDescription.loading;
export const selectSuccess = (state: RootState) => state.changeTeamDescription.success;

export default changeTeamDescription.reducer;
