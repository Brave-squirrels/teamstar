import { createSlice } from "@reduxjs/toolkit";
import axios from "axios/axiosMain";
import { AppThunk, RootState } from 'reduxState/store';
import toastNofity from "utils/toastNotify";
import { logout } from 'reduxState/user/loginUser';

interface State {
    loading: boolean;
    success: boolean;
}

const initialState: State = {
    loading: false,
    success: false,
}

const deleteUser = createSlice({
    name: 'deleteUser',
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

export const { start, success, failed } = deleteUser.actions;

export const deleteUserFetch = (): AppThunk => async (dispatch) => {
    dispatch(start());
    await axios.delete('/users', {
        headers: {
            'x-auth-token': localStorage.getItem('token')
        }
    })
        .then(res => {
            dispatch(success());
            dispatch(logout());
            toastNofity(res.status);
        }).catch((err) => {
            dispatch(failed());
            toastNofity(err.response.status, err.response.data);
        })
}

export const selectLoading = (state: RootState) => state.deleteUser.loading;
export const selectSuccess = (state: RootState) => state.deleteUser.success;

export default deleteUser.reducer;