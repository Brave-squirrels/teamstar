import { createSlice } from "@reduxjs/toolkit";
import axios from "axios/axiosMain";
import { AppThunk, RootState } from 'reduxState/store';
import toastNofity from "utils/toastNotify";

interface State {
    loading: boolean;
    success: boolean;
}

interface Data {
    id: any;
}

const initialState: State = {
    loading: false,
    success: false,
}

const declineInvite = createSlice({
    name: 'declineInvite',
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

export const { start, success, failed } = declineInvite.actions;

export const declineInviteFetch = (data: Data, teamId: string): AppThunk => async (dispatch) => {
    dispatch(start());
    await axios.put(`/teams/${teamId}/deleteInvite`, data, {
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

export const selectLoading = (state: RootState) => state.declineInvite.loading;
export const selectSuccess = (state: RootState) => state.declineInvite.success;

export default declineInvite.reducer;