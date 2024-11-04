import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  historiqueStatusCpData: {},
  pageIndex: 1,
};
const HistoriqueCp = createSlice({
  name: "HistoriqueCp",
  initialState,
  reducers: {
    getHistoriqueCp: (state, action) => {
      state.historiqueStatusCpData = action.payload;
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

export const { getHistoriqueCp, nextPage, previousPage, resetPage, totalPage } =
  HistoriqueCp.actions;
export default HistoriqueCp.reducer;
