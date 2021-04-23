import { createSlice } from "@reduxjs/toolkit";
import axios from "axios/axiosMain";
import { AppThunk, RootState } from 'reduxState/store';
import toastNofity from "utils/toastNotify";

interface State {
    loading: boolean;
    success: boolean;
}

interface Data {
    name: string;
    description: string;
}

const initialState: State = {
    loading: false,
    success: false,
}

const createTeam = createSlice({
    name: 'createTeam',
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

export const { start, success, failed } = createTeam.actions;

export const createTeamFetch = (data: Data): AppThunk => async (dispatch) => {
    dispatch(start());
    await axios.post('/teams', data, {
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

export const selectLoading = (state: RootState) => state.createTeam.loading;
export const selectSuccess = (state: RootState) => state.createTeam.success;

export default createTeam.reducer;