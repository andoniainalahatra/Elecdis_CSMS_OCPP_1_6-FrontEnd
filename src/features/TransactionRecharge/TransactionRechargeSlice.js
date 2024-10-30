import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    transactionRechargedata : {},
    pageIndex : 1
}

const transactionRechargeSlice = createSlice({
    name : "transactionRecharge",
    initialState,
    reducers : {
        getTransactionRecharge: (state, action) => {
            state.transactionRechargedata = action.payload;
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
    }
})

export const { getTransactionRecharge, nextPage, previousPage, resetPage, totalPage } =
transactionRechargeSlice.actions;
export default transactionRechargeSlice.reducer;