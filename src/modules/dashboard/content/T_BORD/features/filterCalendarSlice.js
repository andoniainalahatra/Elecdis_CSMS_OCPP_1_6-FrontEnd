import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalSession : null,
    energyDelivery : null,
    allRevenu : null,
    newUser : null
};

const filterDateSlice = createSlice({
    name : "filterCalendarDate",
    initialState,
    reducers : {
        filterDateForAllSession : (state, action) => {
            state.totalSession = action.payload
        },
        filterDateForEnergy : (state, action) => {
            state.energyDelivery = action.payload
        },
        filterDateForAllRevenu : (state, action) => {
            state.allRevenu = action.payload
        },
        filterDateForNewUser : (state, action) => {
            state.newUser = action.payload
        }
    }
})

export const { filterDateForAllRevenu, filterDateForAllSession, filterDateForEnergy, filterDateForNewUser } = filterDateSlice.actions;
export default filterDateSlice.reducer;