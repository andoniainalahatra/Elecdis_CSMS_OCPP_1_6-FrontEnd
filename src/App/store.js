import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import stationReducer from "../features/Stations/stationSlice"
import userReducer from "@/features/Users/userSlice";

const store = configureStore({
    reducer : {
        auth : authReducer,
        station: stationReducer,
        user:userReducer
    }
})

export default store;