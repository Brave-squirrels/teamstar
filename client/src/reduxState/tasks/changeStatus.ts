import { createSlice } from "@reduxjs/toolkit";
import axios from "axios/axiosMain";
import { AppThunk, RootState } from "reduxState/store";
import toastNofity from "utils/toastNotify";

interface State {
  loading: boolean;
  success: boolean;
}

const initialState: State = {
  loading: false,
  success: false,
};

interface Data {
  status: number;
}

const changeStatus = createSlice({
  name: "changeStatus",
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

export const { start, success, failed } = changeStatus.actions;

export const changeStatusFetch = (
  teamId: string,
  taskId: string,
  data: Data
): AppThunk => async (dispatch) => {
  dispatch(start());
  await axios
    .put(`/teams/${teamId}/tasks/${taskId}/changeStatus`, data, {
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

export const selectLoading = (state: RootState) => state.changeStatus.loading;
export const selectSuccess = (state: RootState) => state.changeStatus.success;

export default changeStatus.reducer;
