import { createSlice } from "@reduxjs/toolkit";
import axios from "axios/axiosMain";
import { AppThunk, RootState } from 'reduxState/store';
import toastNofity from "utils/toastNotify";

interface State {
    loading: boolean;
    success: boolean;
}

interface Data {
    email: string;
}

const initialState: State = {
    loading: false,
    success: false,
}

const sendInvite = createSlice({
    name: 'sendInvite',
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
        }
    }
})

export const { start, success, failed } = sendInvite.actions;

export const sendInviteFetch = (data: Data, teamId: string): AppThunk => async (dispatch) => {
    dispatch(start());
    await axios.put(`/teams/${teamId}/sendInvite`, data, {
        headers: {
            'x-auth-token': localStorage.getItem('token')
        }
    }).then(res => {
        dispatch(success());
        toastNofity(res.status);
    }).catch((err) => {
        dispatch(failed());
        toastNofity(err.response.status, err.response.data);
    })
}

export const selectLoading = (state: RootState) => state.sendInvite.loading;
export const selectSuccess = (state: RootState) => state.sendInvite.success;

export default sendInvite.reducer;