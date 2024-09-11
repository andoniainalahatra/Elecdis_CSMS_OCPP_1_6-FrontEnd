import DataTable from "@/components/Privates/forms/tables/DataTable";
import SessionChart from "./components/SessionChart";
import Columns from "@/components/Privates/forms/tables/Columns";
import { chargingSessions } from "@/_mock/ChargingSession";
const SessionRecharge = () => {
  const datas = ["id", "proprietaire",  "energieConsommee", "station", "location", "connecteur", "dateDebut", "dateFin", "statut"];
    const columns = Columns(datas);
  return (
    <div className="w-full h-auto p-6">
      <h2 className="text-[#212B36] text-xl mb-6">Session de recharge</h2>
      <SessionChart /> 
      <div>
        <DataTable
        datas={chargingSessions}
        columns={columns}
        />
      </div>
    </div>
  );
};

export default SessionRecharge;
