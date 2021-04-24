import { createSlice } from "@reduxjs/toolkit";
import axios from "axios/axiosMain";
import { AppThunk, RootState } from "reduxState/store";
import toastNofity from "utils/toastNotify";

import * as types from 'utils/types';
interface State {
    loading: boolean;
    chatData: types.ChatSchema;
}

const initialState: State = {
    loading: false,
    chatData: types.basicChat
};

const getChat = createSlice({
    name: "getChat",
    initialState,
    reducers: {
        start: (state) => {
            state.loading = true;
            state.chatData = types.basicChat
        },
        success: (state, action) => {
            state.loading = false;
            state.chatData = action.payload;
        },
        failed: (state) => {
            state.loading = false;
            state.chatData = types.basicChat
        },
    },
});

export const { start, success, failed } = getChat.actions;

export const getChatFetch = (chatId: any): AppThunk => async (
    dispatch
) => {
    dispatch(start());
    await axios
        .get(`/chat/${chatId}`, {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            },
        })
        .then((res) => {
            dispatch(success(res.data));
        })
        .catch((err) => {
            dispatch(failed());
            toastNofity(err.response.status, err.response.data);
        });
};

export const selectLoading = (state: RootState) => state.getChat.loading;
export const selectData = (state: RootState) => state.getChat.chatData;

export default getChat.reducer;
