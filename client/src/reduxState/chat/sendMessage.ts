import { createSlice } from "@reduxjs/toolkit";
import axios from "axios/axiosMain";
import { AppThunk, RootState } from "reduxState/store";
import toastNofity from "utils/toastNotify";

interface State {
    loading: boolean;
    success: boolean;
}

interface Data {
    content: string
}

const initialState: State = {
    loading: false,
    success: false,
};

const sendMessage = createSlice({
    name: "sendMessage",
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
        },
    },
});

export const { start, success, failed } = sendMessage.actions;

export const sendMessageFetch = (data: Data, chatId: any): AppThunk => async (
    dispatch
) => {
    dispatch(start());
        console.log(data)

    await axios
        .put(`/chat/message/add/${chatId}`, data, {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            },
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

export const selectLoading = (state: RootState) => state.sendMessage.loading;
export const selectSuccess = (state: RootState) => state.sendMessage.success;

export default sendMessage.reducer;
