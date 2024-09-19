import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import stationReducer from "../features/Stations/stationSlice"

const store = configureStore({
    reducer : {
        auth : authReducer,
        station: stationReducer,
    }
})

export default store;