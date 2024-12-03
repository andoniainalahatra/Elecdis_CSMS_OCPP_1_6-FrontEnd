import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reservationData: {},
    pageIndex: 1,
  };
  const reservationSlice=createSlice({
    name:"reservation",
    initialState,
    reducers:{
        getReservation:(state,action)=>{
            state.reservationData=action.payload
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
  });
  export const { getReservation, nextPage, previousPage, resetPage, totalPage } =
  reservationSlice.actions;
export default reservationSlice.reducer;