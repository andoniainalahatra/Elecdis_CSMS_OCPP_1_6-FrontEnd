import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  defaillanceData: {},
  pageIndex: 1,
};
const defaillanceSlice = createSlice({
  name: "defaillance",
  initialState,
  reducers: {
    getDefaillance: (state, action) => {
      state.defaillanceData = action.payload;
    },
    nextPage: (state, action) => {
      state.pageIndex = action.payload;
    },
    previousPage: (state, action) => {
      state.pageIndex = action.payload;
    },
    resetPage: (state) => {
      state.pageIndex = 1;
    },
    totalPage: (state, action) => {
      state.pageIndex = action.payload;
    },
  },
});

export const { getDefaillance, nextPage, previousPage, resetPage, totalPage } =
  defaillanceSlice.actions;
export default defaillanceSlice.reducer;
