import { createSlice } from "@reduxjs/toolkit";
import axios from "../../axios/axiosMain";
import { AppThunk, RootState } from '../store'

const initialState: any = {
  loading: true,
  data: {},
};

const testData = createSlice({
  name: "testData",
  initialState,
  reducers: {
    getData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { getData } = testData.actions;

export const fetchData = (): AppThunk => async (dispatch) => {
  await axios
    .get("/posts/1")
    .then((res) => {
      dispatch(getData(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const selectData = (state: RootState) => state.testData;

export default testData.reducer;
