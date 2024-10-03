import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import stationReducer from "../features/Stations/stationSlice";
import userReducer from "@/features/Admin/userSlice";
import rfidReducer from "@/features/RFID/rfidSlice";
import sessionReducer from "@/features/sessions/sessionSlice";
import clientReducer from "@/modules/dashboard/content/GRC/config/client/clientSlice";
import filterCalendarDateReducer from "@/modules/dashboard/content/T_BORD/features/filterCalendarSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    station: stationReducer,
    user: userReducer,
    rfid: rfidReducer,
    session: sessionReducer,
    client: clientReducer,
    filterCalendarDate : filterCalendarDateReducer
  },
});

export default store;
