import { dataHeures } from "@/_mock/DataSimulateForHeur";

import AverageCharge from "./AverageCharge";
import SessionBarChart from "./SessionBarChart";
import HeurePoint from "./HeurePoint";

export default function SessionChart() {
  
  const sessionConfig = {
    nombreSession: {
      label: "nombre de session",
      color: "#F2505D",
    },
    uniqueUsers: {
      label: "Utilisateurs uniques",
      color: "#26BF78",
    },
  };
  const chartData = dataHeures;
  return (
    <div className="grid grid-cols-3 gap-6 w-full my-5">
    <div className="col-span-1 flex flex-col gap-6">
        <AverageCharge minSession={15} maxSession={180} averageSession={60} />
        <HeurePoint maxHour={23} minHour={0} averageHour={13} />
    </div>
    <div className="col-span-2">
        <SessionBarChart sessionConfig={sessionConfig} data={chartData} />
    </div>
</div>
  );
}
