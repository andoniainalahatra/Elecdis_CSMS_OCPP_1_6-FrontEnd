import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import stationReducer from "../features/Stations/stationSlice";
import defaillanceReducer from "../features/Defaillance/defaillanceSlice.js";
import userReducer from "@/features/Admin/userSlice";
import rfidReducer from "@/features/RFID/rfidSlice";
import sessionReducer from "@/features/sessions/sessionSlice";
import clientReducer from "@/modules/dashboard/content/GRC/config/client/clientSlice";
import filterCalendarDateReducer from "@/modules/dashboard/content/T_BORD/features/filterCalendarSlice";
import chartSessionReducer from "@/modules/dashboard/content/ACTIVITE/features/chartSessionSlice";
import rfidSpecificReducer from "@/components/features/SpecificRFID/rfidSpecificSlice";
import sessionSpecificReducer from "@/components/features/SpecificSession/sessionSpecificSlice";
import transactionRechargeReducer from "@/features/TransactionRecharge/TransactionRechargeSlice";
import HistoriqueCpReducer from "@/features/historiqueStatusCp/historiqueCpSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    station: stationReducer,
    user: userReducer,
    defaillance: defaillanceReducer,
    rfid: rfidReducer,
    session: sessionReducer,
    client: clientReducer,
    filterCalendarDate: filterCalendarDateReducer,
    sessionDate: chartSessionReducer,
    rfidSPecific: rfidSpecificReducer,
    sessionSpecific: sessionSpecificReducer,
    historiqueStatusCp: HistoriqueCpReducer,
    transactionRecharge: transactionRechargeReducer,
  },
});

export default store;
