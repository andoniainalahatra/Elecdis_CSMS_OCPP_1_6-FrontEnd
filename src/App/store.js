import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import stationReducer from "../features/Stations/stationSlice"
import userReducer from "@/features/Users/userSlice";
import rfidReducer from "@/features/RFID/rfidSlice";

const store = configureStore({
    reducer : {
        auth : authReducer,
        station: stationReducer,
        user:userReducer,
        rfid:rfidReducer
    }
})

export default store;